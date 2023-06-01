import { AUTH } from "../../.config.json";
import { Request, Response } from "express";
import { default as BotSchema } from "../database/BotSchema";
import { REQUIRED_BOT_PROPERTIES } from "../../constants.json";
import type { BotStructure, ExpressResponsePromise, SearchBotOptions, Snowflake } from "../typings";
import { UNAUTHORIZED, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR, CREATED, OK } from "./status-code.json";
import { INVALID_AUTH, CANNOT_CREATE_THE_BOT, BOT_ALREADY_EXISTS, SOME_PROPERTIES_IS_MISSING, NO_QUERY_IN_BODY } from "./errors.json";

/** Add a bot */

export const POST: (req: Request, res: Response) => ExpressResponsePromise = async (req: Request, res: Response): ExpressResponsePromise => {
	if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: INVALID_AUTH, code: UNAUTHORIZED });
	if (req.params.platform === "search") {
		const query: SearchBotOptions["query"] = req.body.query;

		if (!query) return res.status(BAD_REQUEST).json({ message: NO_QUERY_IN_BODY, code: BAD_REQUEST });

		const searched = (await BotSchema.find(query)).slice(0, query.limit ?? 250);

		return res.status(OK).json(searched);
	}

	const _id: Snowflake = req.params.id;

	const properties: Partial<BotStructure> = req.body;
	const keys: string[] = Object.keys(properties);

	if (!REQUIRED_BOT_PROPERTIES.every((prop: string): boolean => keys.includes(prop))) return res.status(BAD_REQUEST).json({ message: SOME_PROPERTIES_IS_MISSING, code: BAD_REQUEST });

	const exists: { _id: Snowflake; } | null = await BotSchema.exists({ _id });

	if (exists) return res.status(NOT_FOUND).json({ message: BOT_ALREADY_EXISTS, code: NOT_FOUND });

	const created = await BotSchema.create({ ...properties, _id });

	if (!created) return res.status(INTERNAL_SERVER_ERROR).json({ message: CANNOT_CREATE_THE_BOT, code: INTERNAL_SERVER_ERROR });

	return res.status(CREATED).json(created);
};