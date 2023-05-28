import { AUTH } from "../../.config.json";
import { Request, Response } from "express";
import { default as BotSchema } from "../database/BotSchema";
import type { BotStructure, ExpressPromise, Snowflake } from "../typings";
import { INVALID_AUTH, CANNOT_EDIT_THE_BOT, BOT_NOT_FOUND } from "./errors.json";
import { UNAUTHORIZED, NOT_FOUND, INTERNAL_SERVER_ERROR, OK } from "./status-code.json";

export const editBot: (req: Request, res: Response) => ExpressPromise = async (req: Request, res: Response): ExpressPromise => {
    if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ error: INVALID_AUTH });

    const _id = req.params.id;
    const exists: { _id: Snowflake; } | null = await BotSchema.exists({ _id });

    if (!exists) return res.status(NOT_FOUND).json({ error: BOT_NOT_FOUND });

    const bodyData: Partial<BotStructure> = req.body;
    const updated = await BotSchema.findByIdAndUpdate({ _id }, { ...bodyData, _id }, { new: true });

    if (!updated) return res.status(INTERNAL_SERVER_ERROR).json({ error: CANNOT_EDIT_THE_BOT });

    return res.status(OK).json(updated);
};