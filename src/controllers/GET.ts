import { Request, Response } from "express";
import { AUTH, CLIENT_TOKEN } from "../../.config.json";
import { default as BotSchema } from "../database/BotSchema";
import { ExpressResponsePromise, Snowflake } from "../typings";
import { UNAUTHORIZED, NOT_FOUND, OK, BAD_REQUEST } from "./status-code.json";
import { BOT_NOT_FOUND, INVALID_AUTH, CANNOT_GET_BOT_VOTES, USER_IS_NOT_A_BOT } from "./errors.json";

/** Get a bot in the database or Discord API */

export const GET: (req: Request, res: Response) => ExpressResponsePromise = async (req: Request, res: Response): ExpressResponsePromise => {
	if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: INVALID_AUTH, code: UNAUTHORIZED });

	const _id: Snowflake = req.params.id;

	if (req.params.platform === "discord") {
		const fetched: globalThis.Response = await fetch(`https://discord.com/api/v10/users/${_id}`, {
			method: "GET",
			headers: { Authorization: `Bot ${CLIENT_TOKEN}` }
		});
		const data = await fetched.json();

		if ("message" in data) return res.status(NOT_FOUND).json({ message: BOT_NOT_FOUND, code: NOT_FOUND });
		if (!data.bot) return res.status(BAD_REQUEST).json({ message: USER_IS_NOT_A_BOT, code: BAD_REQUEST });

		return res.status(OK).json(data);
	}
	
	const targetBot = await (_id === "@all" ? BotSchema.find({}) : BotSchema.findById({ _id }));

	if (!targetBot) return res.status(NOT_FOUND).json({ message: BOT_NOT_FOUND, code: NOT_FOUND });

	if (req.params.platform === "votes") {
		if (Array.isArray(targetBot)) return res.status(BAD_REQUEST).json({ message: CANNOT_GET_BOT_VOTES, code: BAD_REQUEST });

		return res.status(OK).json(targetBot.votes);
	}

	return res.status(OK).json(targetBot);
};