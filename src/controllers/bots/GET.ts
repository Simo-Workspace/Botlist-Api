import { BOT } from "../errors.json";
import { Request, Response } from "express";
import { voteStatus } from "./core/vote-status";
import { fetchFeedbacks } from "./core/fetch-feedbacks";
import { default as BotSchema } from "../../schemas/Bot";
import { NOT_FOUND, OK, BAD_REQUEST } from "../status-code.json";
import { BotStructure, ExpressResponse, Schema, Snowflake } from "../../types/types";

/** Get a bot in the database or Discord API */

export const GET: (req: Request, res: Response) => ExpressResponse = async (req: Request, res: Response): ExpressResponse => {
    const query = req.query;

    if (Object.keys(query).length > 0) {
        const limit: number = parseInt(query.limit as string);
        const data: Schema<BotStructure>[] = await BotSchema.find(query, null, { limit: limit > 500 ? 500 : limit });

        return res.status(OK).json(data);
    }

    const { id: _id, method } = req.params;

    if (method === "feedbacks") return fetchFeedbacks(req, res);
    if (method === "exists") {
        const exists: { _id: Snowflake; } | null = await BotSchema.exists({ _id });

        return res.status(OK).json({ exists: exists ? true : false });
    }

    const targetBot: Schema<BotStructure> | Schema<BotStructure>[] | null = await (!_id ? BotSchema.find({}) : BotSchema.findById({ _id }));

    if (!targetBot) return res.status(NOT_FOUND).json({ message: BOT.BOT_NOT_FOUND, code: NOT_FOUND });
    if (method === "votes") {
        if (Array.isArray(targetBot)) return res.status(BAD_REQUEST).json({ message: BOT.CANNOT_GET_BOT_VOTES, code: BAD_REQUEST });

        return res.status(OK).json(targetBot.votes);
    }
    if (method === "vote-status") return voteStatus(req, res);

    return res.status(OK).json(targetBot);
};