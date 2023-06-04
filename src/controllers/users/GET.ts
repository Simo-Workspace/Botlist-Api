import { Request, Response } from "express";
import { GENERICS, BOT } from "../errors.json";
import { CLIENT_TOKEN, AUTH } from "../../.././.config.json";
import { NOT_FOUND, OK, UNAUTHORIZED } from "../status-code.json";
import { ExpressResponsePromise, RawDiscordUser } from "../../types/types";

/** Get an user in Discord API */

export const GET: (req: Request, res: Response) => ExpressResponsePromise = async (req: Request, res: Response): ExpressResponsePromise => {                 
    if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: GENERICS.INVALID_AUTH, code: UNAUTHORIZED });
    
    const fetched: globalThis.Response = await fetch(`https://discord.com/api/v10/users/${req.params.id}`, { method: "GET", headers: { Authorization: `Bot ${CLIENT_TOKEN}` } });
    const data: RawDiscordUser = await fetched.json();

    if ("message" in data) return res.status(NOT_FOUND).json({ message: BOT.BOT_NOT_FOUND, code: NOT_FOUND });

    return res.status(OK).json(data);
};