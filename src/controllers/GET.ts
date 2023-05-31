import { Request, Response } from "express";
import { ExpressPromise, Snowflake } from "../typings";
import { AUTH, CLIENT_TOKEN } from "../../.config.json";
import { BOT_NOT_FOUND, INVALID_AUTH } from "./errors.json";
import { default as BotSchema } from "../database/BotSchema";
import { UNAUTHORIZED, NOT_FOUND, OK } from "./status-code.json";

/** Get a bot in the database or Discord API */

export const GET: (req: Request, res: Response) => ExpressPromise = async (req: Request, res: Response): ExpressPromise => {
	if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: INVALID_AUTH, code: UNAUTHORIZED });

	const _id: Snowflake = req.params.id;

	if (req.params.platform === "discord") {
		const fetched: globalThis.Response = await fetch(`https://discord.com/api/v10/users/${_id}`, {
			method: "GET",
			headers: { Authorization: `Bot ${CLIENT_TOKEN}` }
		});
		const data = await fetched.json();

		if ("message" in data) return res.status(NOT_FOUND).json({ message: BOT_NOT_FOUND, code: NOT_FOUND });

		return res.status(OK).json(data);
	}
	
	const targetBot = await (_id === "@all" ? BotSchema.find({}) : BotSchema.findById({ _id }));

	if (!targetBot) return res.status(NOT_FOUND).json({ message: BOT_NOT_FOUND, code: NOT_FOUND });

	return res.status(OK).json(targetBot);
};