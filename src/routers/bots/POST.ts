import ms from "ms";
import { Types } from "mongoose";
import { Request, Response } from "express";
import { Checkers } from "../helpers/Checkers";
import FeedbackSchema from "../../core/schemas/Feedback";
import { GENERICS, BOT, FEEDBACK } from "../errors.json";
import { REQUIRED_PROPS } from "../../../constants.json";
import { default as BotSchema } from "../../core/schemas/Bot";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, CREATED, NOT_FOUND } from "../status-code.json";
import type { BotStructure, ExpressResponse, FeedbackStructure, Schema, Snowflake, VoteStructure } from "../../core/types/types";

/** Create a bot, vote, or submit a feedback */

export const POST: (req: Request, res: Response) => ExpressResponse = async (req: Request, res: Response): ExpressResponse => {
    const { id: _id, method, user: author } = req.params;

    if (method === "feedbacks") {
        if (!author) return res.status(BAD_REQUEST).json({ message: FEEDBACK.UNKNOWN_USER, code: BAD_REQUEST });

        const exists: { _id: Types.ObjectId; } | null = await FeedbackSchema.exists({ author });

        if (exists) return res.status(BAD_REQUEST).json({ message: FEEDBACK.THE_USER_ALREADY_SENT, code: BAD_REQUEST });

        const body: Partial<FeedbackStructure> = req.body;
        const keys: string[] = Object.keys(body);

        if (!REQUIRED_PROPS.FEEDBACK.every((property: string): boolean => keys.includes(property))) return res.status(BAD_REQUEST).json({ message: GENERICS.SOME_PROPERTIES_IS_MISSING, code: BAD_REQUEST, bonus: { missing_properties: REQUIRED_PROPS.FEEDBACK.filter((property: string): boolean => !keys.includes(property)) } });
        if (!Checkers.Feedback.validate(body)) return res.status(BAD_REQUEST).json({ message: GENERICS.INVALID_PROPS, code: BAD_REQUEST });

        const created: Schema<FeedbackStructure, Types.ObjectId> = await FeedbackSchema.create({ ...body, author, targetBot: _id });

        if (!created) return res.status(INTERNAL_SERVER_ERROR).json({ message: GENERICS.INTERNAL_SERVER_ERROR, code: INTERNAL_SERVER_ERROR });

        return res.status(CREATED).json(created);
    }

    const properties: Partial<BotStructure> | { user: Snowflake; } = req.body;
    const exists: { _id: Snowflake; } | null = await BotSchema.exists({ _id });

    if (method === "votes") {
        if (!exists) return res.status(NOT_FOUND).json({ message: BOT.BOT_NOT_FOUND, code: NOT_FOUND });
        if (!("user" in properties)) return res.status(BAD_REQUEST).json({ message: BOT.MISSING_USER_PROP, code: BAD_REQUEST });

        const fetched: globalThis.Response = await fetch(`https://discord.com/api/v10/users/${properties.user}`, { method: "GET", headers: { Authorization: `Bot ${process.env.CLIENT_TOKEN}` } });
        const { bot }: { bot: boolean; } = await fetched.json();

        if (bot || properties.user === _id) return res.status(BAD_REQUEST).json({ message: BOT.BOT_CANNOT_VOTE_IN_A_BOT, code: BAD_REQUEST });

        const votes: Schema<BotStructure> | null = await BotSchema.findOne({ _id, "votes.user": properties.user });

        if (!votes) {
            const voteBody: { user: Snowflake; lastVote: string; votes: number; } = {
                user: properties.user,
                lastVote: new Date().toISOString(),
                votes: 1
            };

            const newVote = await BotSchema.findOneAndUpdate(
                { _id },
                { $push: { votes: voteBody } },
                { new: true }
            );

            return res.status(CREATED).json(newVote?.votes);
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const { lastVote }: { lastVote: string; } = votes.votes.find((vote: VoteStructure): boolean => vote.user === properties.user)!;

        const twelveHours: 43200000 = 4.32e+7;
        const timeLeft: number = (new Date().getTime() - new Date(lastVote).getTime());

        if (timeLeft < twelveHours) return res.status(BAD_REQUEST).json({ message: BOT.COOLDOWN_VOTE.replace("{ms}", ms(twelveHours - timeLeft, { long: true })), code: BAD_REQUEST });

        const vote: Schema<BotStructure> | null = await BotSchema.findOneAndUpdate(
            { _id, "votes.user": properties.user },
            { $inc: { "votes.$.votes": 1 }, $set: { "votes.$.lastVote": new Date().toISOString() } },
            { new: true }
        );

        return res.status(CREATED).json(vote?.votes);
    }

    const keys: string[] = Object.keys(properties);

    if (!REQUIRED_PROPS.BOT.every((property: string): boolean => keys.includes(property))) return res.status(BAD_REQUEST).json({ message: GENERICS.SOME_PROPERTIES_IS_MISSING, code: BAD_REQUEST, bonus: { missing_properties: REQUIRED_PROPS.BOT.filter((property: string): boolean => !keys.includes(property)) } });
    if (!Checkers.Bot.validate(req.body)) return res.status(BAD_REQUEST).json({ message: GENERICS.INVALID_PROPS, code: BAD_REQUEST });
    if (exists) return res.status(BAD_REQUEST).json({ message: BOT.BOT_ALREADY_EXISTS, code: BAD_REQUEST });

    const created: Schema<BotStructure> = await BotSchema.create({ ...properties, _id });

    if (!created) return res.status(INTERNAL_SERVER_ERROR).json({ message: GENERICS.INTERNAL_SERVER_ERROR, code: INTERNAL_SERVER_ERROR });

    return res.status(CREATED).json(created);
};