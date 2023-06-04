import { Request, Response } from "express";
import { AUTH } from "../../../.config.json";
import GuildSchema from "../../database/Guild";
import { REQUIRED_GUILD_PROPERTIES } from "../../../constants.json";
import { GuildStructure, ExpressResponsePromise, Snowflake } from "../../typings";
import { UNAUTHORIZED, BAD_REQUEST, INTERNAL_SERVER_ERROR, CREATED } from "../status-code.json";
import { INVALID_AUTH, CANNOT_CREATE_THE_GUILD, GUILD_ALREADY_EXISTS, SOME_PROPERTIES_IS_MISSING } from "../errors.json";

/** Create a guild */

export const POST: (req: Request, res: Response) => ExpressResponsePromise = async (req: Request, res: Response): ExpressResponsePromise => {
	if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: INVALID_AUTH, code: UNAUTHORIZED });

	const _id: Snowflake = req.params.id;
	const properties: Partial<GuildStructure> = req.body;
	const keys: string[] = Object.keys(properties);

	if (!REQUIRED_GUILD_PROPERTIES.every((prop: string): boolean => keys.includes(prop))) return res.status(BAD_REQUEST).json({ message: SOME_PROPERTIES_IS_MISSING, code: BAD_REQUEST });

	const exists: { _id: Snowflake; } | null = await GuildSchema.exists({ _id });

	if (exists) return res.status(BAD_REQUEST).json({ message: GUILD_ALREADY_EXISTS, code: BAD_REQUEST });

	const created = await GuildSchema.create({ ...properties, _id });

	if (!created) return res.status(INTERNAL_SERVER_ERROR).json({ message: CANNOT_CREATE_THE_GUILD, code: INTERNAL_SERVER_ERROR });

	return res.status(CREATED).json(created);
};