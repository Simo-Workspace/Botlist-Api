import { Request, Response } from "express";
import BotSchema from "../database/BotSchema";
import { AUTH, CLIENT_TOKEN } from "../../.config.json";
import { BotStructure, ExpressPromise } from "../typings";
import { INVALID_AUTH, CANNOT_EDIT_THE_BOT } from "./errors.json";
import { UNAUTHORIZED, INTERNAL_SERVER_ERROR, OK } from "./status-code.json";

export const updateBot: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>> = async (req: Request, res: Response): ExpressPromise => {
	if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: INVALID_AUTH, code: UNAUTHORIZED });

	const _id = req.params.id;
	const data: Partial<BotStructure> & { auto?: boolean; } = req.body;
    
	if (data.auto) {
		const request: globalThis.Response = await fetch(`https://discord.com/api/v10/users/${_id}`, { method: "GET", headers: { Authorization: `Bot ${CLIENT_TOKEN}` } });
		const { username, avatar }: { username: string; avatar: string | undefined; } = await request.json();

		const updated = await BotSchema.findByIdAndUpdate({ _id }, { name: username, avatar }, { new: true });

		if (!updated) return res.status(INTERNAL_SERVER_ERROR).json({ message: CANNOT_EDIT_THE_BOT, code: INTERNAL_SERVER_ERROR });

		return res.status(OK).json(updated);
	}

	const updated = await BotSchema.findByIdAndUpdate({ _id }, data, { new: true });

	if (!updated) return res.status(INTERNAL_SERVER_ERROR).json({ message: CANNOT_EDIT_THE_BOT, code: INTERNAL_SERVER_ERROR });

	return res.status(OK).json(updated);
};