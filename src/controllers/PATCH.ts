import { AUTH } from "../../.config.json";
import { Request, Response } from "express";
import type { BotStructure } from "../typings";
import { default as BotSchema } from "../schemas/Bot";
import { INVALID_AUTH, CANNOT_EDIT_THE_BOT, MISSING_ID_PROPERTY } from "./errors.json";

export const editBot = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    if (req.headers.authorization !== AUTH) return res.json({ error: INVALID_AUTH });

    const query: Partial<BotStructure> = req.body;

    if (!('_id' in query)) return res.json({ error: MISSING_ID_PROPERTY });

    const updated = await BotSchema.findByIdAndUpdate({ _id: query._id }, query, { new: true });

    if (!updated) return res.json({ error: CANNOT_EDIT_THE_BOT });

    return res.json(updated);
};