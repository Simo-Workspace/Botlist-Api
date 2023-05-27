import { AUTH } from "../../.config.json";
import { Request, Response } from "express";
import { default as BotSchema } from "../database/BotSchema";
import type { BotStructure, ExpressPromise } from "../typings";
import { INVALID_AUTH, CANNOT_EDIT_THE_BOT, MISSING_ID_PROPERTY } from "./errors.json";

export const editBot: (req: Request, res: Response) => ExpressPromise = async (req: Request, res: Response): ExpressPromise => {
    if (req.headers.authorization !== AUTH) return res.json({ error: INVALID_AUTH });

    const _id = req.params.id;
    const query: Partial<BotStructure> = req.body;

    if (!_id) return res.json({ error: MISSING_ID_PROPERTY });

    const updated = await BotSchema.findByIdAndUpdate({ _id }, query, { new: true });

    if (!updated) return res.json({ error: CANNOT_EDIT_THE_BOT });

    return res.json(updated);
};