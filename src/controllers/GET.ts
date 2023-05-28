import { Request, Response } from "express";
import { AUTH, CLIENT_TOKEN } from "../../.config.json";
import { default as BotSchema } from "../database/BotSchema";
import { ExpressPromise, SearchBotOptions, Snowflake } from "../typings";
import { BOT_NOT_FOUND, INVALID_AUTH, NO_QUERY_IN_BODY } from "./errors.json";
import { UNAUTHORIZED, NOT_FOUND, OK, BAD_REQUEST } from "./status-code.json";

export const getBot: (req: Request, res: Response) => ExpressPromise = async (req: Request, res: Response): ExpressPromise => {
    if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ error: INVALID_AUTH });

    const _id: Snowflake = req.params.id;

    if (req.params.platform === 'discord') {
        const fetched: globalThis.Response = await fetch(`https://discord.com/api/v10/users/${_id}`, {
            method: 'GET',
            headers: { Authorization: `Bot ${CLIENT_TOKEN}` }
        });
        const data = await fetched.json();

        if ('message' in data) return res.status(NOT_FOUND).json({ error: BOT_NOT_FOUND });

        return res.status(OK).json(data);
    };
    if (req.params.platform === 'search') {
        const query: SearchBotOptions['query'] = req.body.query;

        if (!query) return res.status(BAD_REQUEST).json({ error: NO_QUERY_IN_BODY });

        const searched = (await BotSchema.find(query)).slice(0, query.limit ?? 250);

        return res.status(OK).json(searched);
    };

    const targetBot = await (_id === '@all' ? BotSchema.find({}) : BotSchema.findById({ _id }));

    if (!targetBot) return res.status(NOT_FOUND).json({ error: BOT_NOT_FOUND });

    return res.status(OK).json(targetBot);
};