import { Request, Response } from "express";
import {GENERICS, BOT } from "../errors.json";
import { default as BotSchema } from "../../database/Bot";
import { ExpressResponse, Snowflake } from "../../types/types";
import { UNAUTHORIZED, NOT_FOUND, OK, BAD_REQUEST } from "../status-code.json";

/** Get a bot in the database or Discord API */

export const GET: (req: Request, res: Response) => ExpressResponse = async (req: Request, res: Response): ExpressResponse => {
    const { AUTH }: NodeJS.ProcessEnv = process.env;
    
    if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: GENERICS.INVALID_AUTH, code: UNAUTHORIZED });

    const query = req.query;

    if (Object.keys(query).length > 0) {
        const limit = parseInt(query.limit as string);
        const data = await BotSchema.find(query, null, { limit: limit > 500 ? 500 : limit });

        return res.status(OK).json(data);
    }

    const _id: Snowflake | undefined = req.params.id;
    const targetBot = await (!_id ? BotSchema.find({}) : BotSchema.findById({ _id }));

    if (!targetBot) return res.status(NOT_FOUND).json({ message: BOT.BOT_NOT_FOUND, code: NOT_FOUND });
    if (req.params.method === "votes") {
        if (Array.isArray(targetBot)) return res.status(BAD_REQUEST).json({ message: BOT.CANNOT_GET_BOT_VOTES, code: BAD_REQUEST });

        return res.status(OK).json(targetBot.votes);
    }

    return res.status(OK).json(targetBot);
};