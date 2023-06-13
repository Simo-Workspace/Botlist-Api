import { Request, Response } from "express";
import { GENERICS, BOT } from "../errors.json";
import { default as BotSchema } from "../../database/Bot";
import { ExpressResponse, Snowflake } from "../../types/types";
import { UNAUTHORIZED, NOT_FOUND, INTERNAL_SERVER_ERROR, OK } from "../status-code.json";

/** Edit a bot */

export const PATCH: (req: Request, res: Response) => ExpressResponse = async (req: Request, res: Response): ExpressResponse => {
    const { AUTH }: NodeJS.ProcessEnv = process.env;
    
    if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: GENERICS.INVALID_AUTH, code: UNAUTHORIZED });

    const _id = req.params.id;
    const exists: { _id: Snowflake; } | null = await BotSchema.exists({ _id });

    if (!exists) return res.status(NOT_FOUND).json({ message: BOT.BOT_NOT_FOUND, code: NOT_FOUND });

    const updated = await BotSchema.findByIdAndUpdate({ _id }, req.body, { new: true });

    if (!updated) return res.status(INTERNAL_SERVER_ERROR).json({ message: BOT.CANNOT_EDIT_THE_BOT, code: INTERNAL_SERVER_ERROR });

    return res.status(OK).json(updated);
};