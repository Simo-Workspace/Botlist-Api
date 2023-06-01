import { AUTH } from "../../.config.json";
import { Request, Response } from "express";
import { INVALID_AUTH, BOT_NOT_FOUND } from "./errors.json";
import { default as BotSchema } from "../database/BotSchema";
import { ExpressResponsePromise, Snowflake } from "../typings";
import { UNAUTHORIZED, NOT_FOUND, OK } from "./status-code.json";

/** Delete a bot */

export const DELETE: (req: Request, res: Response) => ExpressResponsePromise = async (req: Request, res: Response): ExpressResponsePromise => {
	if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: INVALID_AUTH, code: UNAUTHORIZED });

	const _id: Snowflake = req.params.id;
	const exists: { _id: Snowflake; } | null = await BotSchema.exists({ _id });

	if (!exists) return res.status(NOT_FOUND).json({ message: BOT_NOT_FOUND, code: NOT_FOUND });

	const deletedBot = await BotSchema.findByIdAndDelete({ _id }, { new: true });

	return res.status(OK).json(deletedBot);
};