import { Request, Response } from "express";
import { NOT_FOUND, OK } from "../helpers/status-code.json";
import { ExpressResponse, RawDiscordUser } from "../../core/types/types";

/** Get an user in Discord API */

export const GET: (req: Request, res: Response) => ExpressResponse = async (req: Request, res: Response): ExpressResponse => {                 
    const { CLIENT_TOKEN }: NodeJS.ProcessEnv = process.env;

    const fetched: globalThis.Response = await fetch(`https://discord.com/api/v10/users/${req.params.id}`, { method: "GET", headers: { Authorization: `Bot ${CLIENT_TOKEN}` } });
    const data: RawDiscordUser = await fetched.json();

    if ("message" in data) return res.status(NOT_FOUND).json({ message: data.message, code: NOT_FOUND });

    return res.status(OK).json(data);
};