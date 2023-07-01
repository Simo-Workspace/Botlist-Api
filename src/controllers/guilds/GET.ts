import { Request, Response } from "express";
import GuildSchema from "../../schemas/Guild";
import { GENERICS, GUILD } from "../errors.json";
import { UNAUTHORIZED, NOT_FOUND, OK } from "../status-code.json";
import { ExpressResponse, GuildStructure, Schema, Snowflake } from "../../types/types";

/** Get a guild in the database */

export const GET: (req: Request, res: Response) => ExpressResponse = async (req: Request, res: Response): ExpressResponse => {
    const { AUTH }: NodeJS.ProcessEnv = process.env;
    
    if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: GENERICS.INVALID_AUTH, code: UNAUTHORIZED });

    const guildId: Snowflake = req.params.id;
    const guild: Schema<GuildStructure> | null = await GuildSchema.findById({ _id: guildId });

    if (!guild) return res.status(NOT_FOUND).json({ message: GUILD.GUILD_NOT_FOUND, code: NOT_FOUND });

    return res.status(OK).json(guild);
};