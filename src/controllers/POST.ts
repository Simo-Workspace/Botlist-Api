import { AUTH } from "../../.config.json";
import { Request, Response } from "express";
import { default as BotSchema } from "../database/BotSchema";
import type { BotStructure, ExpressPromise } from "../typings";
import { INVALID_AUTH, CANNOT_CREATE_THE_BOT } from "./errors.json";

export const addBot: (req: Request, res: Response) => ExpressPromise = async (req: Request, res: Response): ExpressPromise => {
    if (req.headers.authorization !== AUTH) return res.json({ error: INVALID_AUTH });

    const properties: Partial<BotStructure> = req.body;

    const created = await BotSchema.create(properties);

    if (!created) return res.json({ error: CANNOT_CREATE_THE_BOT });

    return res.json(created);
};