import { Request, Response } from "express";
import { AUTH } from "../../../.config.json";
import GuildSchema from "../../database/Guild";
import { ExpressResponsePromise } from "../../typings";
import { INVALID_AUTH, GUILD_NOT_FOUND } from "../errors.json";
import { UNAUTHORIZED, NOT_FOUND, OK } from "../status-code.json";

/** Get a guild in the database */

export const GET: (req: Request, res: Response) => ExpressResponsePromise = async (req: Request, res: Response): ExpressResponsePromise => {
    if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: INVALID_AUTH, code: UNAUTHORIZED });

    const guild = await GuildSchema.findById({ _id: req.params.id });

    if (!guild) return res.status(NOT_FOUND).json({ message: GUILD_NOT_FOUND, code: NOT_FOUND });

    return res.status(OK).json(guild);
};