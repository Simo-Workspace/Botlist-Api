import { Request, Response } from "express";
import { default as BotSchema } from "../database/Bot";
import { AUTH, CLIENT_TOKEN } from "../../.config.json";
import { ExpressPromise, SearchBotOptions } from "../typings";
import { BOT_NOT_FOUND, INVALID_AUTH, NO_QUERY_IN_BODY } from "./errors.json";

export const getBot = async (req: Request, res: Response): ExpressPromise => {
    if (req.headers.authorization !== AUTH) return res.json({ error: INVALID_AUTH });

    const _id: string = req.params.id;

    if (req.params.platform === 'discord') {
        const fetched = await fetch(`https://discord.com/api/v10/users/${_id}`, {
            method: 'GET',
            headers: { Authorization: `Bot ${CLIENT_TOKEN}` }
        });
        const data = await fetched.json();

        return res.json('message' in data ? { error: BOT_NOT_FOUND } : data);
    };
    if (req.params.platform === 'search') {
        const query: SearchBotOptions['query'] = req.body.query;

        if (!query) return res.json({ error: NO_QUERY_IN_BODY });

        const searched = (await BotSchema.find(query)).slice(0, query.limit ?? 250);

        return res.json(searched);
    };

    const targetBot = await (_id === '@all' ? BotSchema.find({}) : BotSchema.findById({ _id }));

    if (!targetBot) return res.json({ error: BOT_NOT_FOUND });

    return res.json(targetBot);
};