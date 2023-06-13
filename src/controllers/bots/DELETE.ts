import { Request, Response } from "express";
import { GENERICS, BOT } from "../errors.json";
import { default as BotSchema } from "../../database/Bot";
import { ExpressResponse, Snowflake } from "../../types/types";
import { UNAUTHORIZED, NOT_FOUND, OK, INTERNAL_SERVER_ERROR } from "../status-code.json";

/** Delete a bot */

export const DELETE: (req: Request, res: Response) => ExpressResponse = async (req: Request, res: Response): ExpressResponse => {
    const { AUTH }: NodeJS.ProcessEnv = process.env;
    
    if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: GENERICS.INVALID_AUTH, code: UNAUTHORIZED });

    const _id: Snowflake = req.params.id;
    const exists: { _id: Snowflake; } | null = await BotSchema.exists({ _id });

    if (!exists) return res.status(NOT_FOUND).json({ message: BOT.BOT_NOT_FOUND, code: NOT_FOUND });

    const deletedBot = await BotSchema.findByIdAndDelete({ _id }, { new: true });

    if (!deletedBot) return res.status(INTERNAL_SERVER_ERROR).json({ message: BOT.CANNOT_DELETE_THE_BOT, code: INTERNAL_SERVER_ERROR });

    return res.status(OK).json(deletedBot);
};