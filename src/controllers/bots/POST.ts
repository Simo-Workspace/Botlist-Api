import ms from "ms";
import { Request, Response } from "express";
import { GENERICS, BOT } from "../errors.json";
import { default as BotSchema } from "../../database/Bot";
import { REQUIRED_BOT_PROPERTIES } from "../../../constants.json";
import type { BotStructure, ExpressResponse, Snowflake, VoteStructure } from "../../types/types";
import { UNAUTHORIZED, BAD_REQUEST, INTERNAL_SERVER_ERROR, CREATED, NOT_FOUND } from "../status-code.json";

/** Create a bot, or vote */

export const POST: (req: Request, res: Response) => ExpressResponse = async (req: Request, res: Response): ExpressResponse => {
    const { AUTH }: NodeJS.ProcessEnv = process.env;

    if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: GENERICS.INVALID_AUTH, code: UNAUTHORIZED });

    const _id: Snowflake = req.params.id;
    const properties: Partial<BotStructure> | { user: Snowflake; } = req.body;
    const exists: { _id: Snowflake; } | null = await BotSchema.exists({ _id });

    if (req.params.method === "votes") {
        if (!exists) return res.status(NOT_FOUND).json({ message: BOT.BOT_NOT_FOUND, code: NOT_FOUND });
        if (!("user" in properties)) return res.status(BAD_REQUEST).json({ message: BOT.MISSING_USER_PROP, code: BAD_REQUEST });

        const fetched: globalThis.Response = await fetch(`https://discord.com/api/v10/users/${req.params.id}`, { method: "GET", headers: { Authorization: `Bot ${process.env.CLIENT_TOKEN}` } });
        const { bot }: { bot: boolean; } = await fetched.json();

        if (bot || properties.user === _id) return res.status(BAD_REQUEST).json({ message: BOT.BOT_CANNOT_VOTE_IN_A_BOT, code: BAD_REQUEST });

        const votes = await BotSchema.findOne({ _id, "votes.user": properties.user });

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

        const oneDay: 86400000 = 8.64e+7;
        const timeLeft: number = (new Date().getTime() - new Date(lastVote).getTime());

        if (timeLeft < oneDay) return res.status(BAD_REQUEST).json({ message: BOT.COOLDOWN_VOTE.replace("{ms}", ms(oneDay - timeLeft, { long: true })), code: BAD_REQUEST });

        const vote = await BotSchema.findOneAndUpdate(
            { _id, "votes.user": properties.user },
            { $inc: { "votes.$.votes": 1 }, $set: { "votes.$.lastVote": new Date().toISOString() } },
            { new: true }
        );

        return res.status(CREATED).json(vote?.votes);
    }

    const keys: string[] = Object.keys(properties);

    if (!REQUIRED_BOT_PROPERTIES.every((property: string): boolean => keys.includes(property))) return res.status(BAD_REQUEST).json({ message: GENERICS.SOME_PROPERTIES_IS_MISSING, code: BAD_REQUEST });
    if (exists) return res.status(BAD_REQUEST).json({ message: BOT.BOT_ALREADY_EXISTS, code: BAD_REQUEST });

    const created = await BotSchema.create({ ...properties, _id });

    if (!created) return res.status(INTERNAL_SERVER_ERROR).json({ message: BOT.CANNOT_CREATE_THE_BOT, code: INTERNAL_SERVER_ERROR });

    return res.status(CREATED).json(created);
};