import { Request, Response } from "express";
import { AUTH } from "../../../.config.json";
import GuildSchema from "../../database/Guild";
import { GENERICS, GUILD } from "../errors.json";
import { ExpressResponse, Snowflake } from "../../types/types";
import { UNAUTHORIZED, NOT_FOUND, OK } from "../status-code.json";

/** Get a guild in the database */

export const GET: (req: Request, res: Response) => ExpressResponse = async (req: Request, res: Response): ExpressResponse => {
    if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: GENERICS.INVALID_AUTH, code: UNAUTHORIZED });

    const guildId: Snowflake = req.params.id;
    const guild = await GuildSchema.findById({ _id: guildId });

    if (!guild) return res.status(NOT_FOUND).json({ message: GUILD.GUILD_NOT_FOUND, code: NOT_FOUND });

    return res.status(OK).json(guild);
};