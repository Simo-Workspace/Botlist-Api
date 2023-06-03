import { Request, Response } from "express";
import { BOT_NOT_FOUND } from "../errors.json";
import { NOT_FOUND, OK } from "../status-code.json";
import { CLIENT_TOKEN } from "../../.././.config.json";
import { ExpressResponsePromise, RawDiscordUser } from "../../typings";

/** Get an user in Discord API */

export const GET: (req: Request, res: Response) => ExpressResponsePromise = async (req: Request, res: Response): ExpressResponsePromise => {                 
    const fetched: globalThis.Response = await fetch(`https://discord.com/api/v10/users/${req.params.id}`, { method: "GET", headers: { Authorization: `Bot ${CLIENT_TOKEN}` } });
    const data: RawDiscordUser = await fetched.json();

    if ("message" in data) return res.status(NOT_FOUND).json({ message: BOT_NOT_FOUND, code: NOT_FOUND });

    return res.status(OK).json(data);
};