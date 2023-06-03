import { AUTH } from "../../../.config.json";
import { Request, Response } from "express";
import { default as BotSchema } from "../../database/BotSchema";
import { ExpressResponsePromise, Snowflake } from "../../typings";
import { UNAUTHORIZED, NOT_FOUND, OK, BAD_REQUEST } from "../status-code.json";
import { BOT_NOT_FOUND, INVALID_AUTH, CANNOT_GET_BOT_VOTES } from "../errors.json";

/** Get a bot in the database or Discord API */

export const GET: (req: Request, res: Response) => ExpressResponsePromise = async (req: Request, res: Response): ExpressResponsePromise => {
	if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: INVALID_AUTH, code: UNAUTHORIZED });

	const query = req.query;

	if (query) {
		const data = await BotSchema.find(query);

		return res.status(OK).json(data.slice(0, parseInt(query.limit as string) || 500));
	}

	const _id: Snowflake = req.params.id;
	const targetBot = await (_id === "@all" ? BotSchema.find({}) : BotSchema.findById({ _id }));

	if (!targetBot) return res.status(NOT_FOUND).json({ message: BOT_NOT_FOUND, code: NOT_FOUND });
	if (req.params.method === "votes") {
		if (Array.isArray(targetBot)) return res.status(BAD_REQUEST).json({ message: CANNOT_GET_BOT_VOTES, code: BAD_REQUEST });

		return res.status(OK).json(targetBot.votes);
	}

	return res.status(OK).json(targetBot);
};