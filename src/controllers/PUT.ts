import { Request, Response } from "express";
import BotSchema from "../database/BotSchema";
import { AUTH, CLIENT_TOKEN } from "../../.config.json";
import { BotStructure, ExpressPromise } from "../typings";
import { INVALID_AUTH, CANNOT_EDIT_THE_BOT, MISSING_ID_PROPERTY } from "./errors.json";

export const updateBot: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>> = async (req: Request, res: Response): ExpressPromise => {
    if (req.headers.authorization !== AUTH) return res.json({ error: INVALID_AUTH });

    const data: Partial<BotStructure> & { auto?: boolean; } = req.body;

    if (!data._id) return res.json({ error: MISSING_ID_PROPERTY });
    if (data.auto) {
        const request: globalThis.Response = await fetch(`https://discord.com/api/v10/users/${data._id}`, { method: 'GET', headers: { Authorization: `Bot ${CLIENT_TOKEN}` } });
        const { username, avatar }: { username: string; avatar?: string; } = await request.json();

        const updated = await BotSchema.findByIdAndUpdate({ _id: data._id }, { name: username, avatar }, { new: true });

        if (!updated) return res.json({ error: CANNOT_EDIT_THE_BOT });

        return res.json(updated);
    };

    const updated = await BotSchema.findByIdAndUpdate({ _id: data._id }, data, { new: true });

    if (!updated) return res.json({ error: CANNOT_EDIT_THE_BOT });

    return res.json(updated);
};