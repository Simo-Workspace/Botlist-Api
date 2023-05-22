import { Request, Response } from "express";
import { default as BotSchema } from "../schemas/Bot";
import { AUTH, CLIENT_TOKEN } from "../../.config.json";
import { BOT_NOT_FOUND, INVALID_AUTH } from "./errors.json";

export const getBot = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
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

    const targetBot = await (_id === '@all' ? BotSchema.find({}) : BotSchema.findById({ _id }));

    if (!targetBot) return res.json({ error: BOT_NOT_FOUND });

    return res.json(targetBot);
};