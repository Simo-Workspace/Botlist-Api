import { Request, Response } from "express";
import { AUTH } from "../../../.config.json";
import { default as BotSchema } from "../../database/Bot";
import { ExpressResponsePromise, Snowflake } from "../../types/types";
import { INVALID_AUTH, BOT_NOT_FOUND, CANNOT_DELETE_THE_BOT } from "../errors.json";
import { UNAUTHORIZED, NOT_FOUND, OK, INTERNAL_SERVER_ERROR } from "../status-code.json";

/** Delete a bot */

export const DELETE: (req: Request, res: Response) => ExpressResponsePromise = async (req: Request, res: Response): ExpressResponsePromise => {
    if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: INVALID_AUTH, code: UNAUTHORIZED });

    const _id: Snowflake = req.params.id;
    const exists: { _id: Snowflake; } | null = await BotSchema.exists({ _id });

    if (!exists) return res.status(NOT_FOUND).json({ message: BOT_NOT_FOUND, code: NOT_FOUND });

    const deletedBot = await BotSchema.findByIdAndDelete({ _id }, { new: true });

    if (!deletedBot) return res.status(INTERNAL_SERVER_ERROR).json({ message: CANNOT_DELETE_THE_BOT, code: INTERNAL_SERVER_ERROR });

    return res.status(OK).json(deletedBot);
};