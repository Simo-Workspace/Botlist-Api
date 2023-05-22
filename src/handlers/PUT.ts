import { AUTH } from "../../.config.json";
import { Request, Response } from "express";
import type { BotStructure } from "../typings";
import { default as BotSchema } from "../schemas/Bot";
import { INVALID_AUTH, CANNOT_CREATE_THE_BOT } from "./errors.json";

export const addBot = async (req: Request, res: Response) => {
    if (req.headers.authorization !== AUTH) return res.json({ error: INVALID_AUTH });

    const properties: Partial<BotStructure> = req.body;

    const created = await BotSchema.create(properties);

    if (!created) return res.json({ error: CANNOT_CREATE_THE_BOT });

    return res.json(created);
};