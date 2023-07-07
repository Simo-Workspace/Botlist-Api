import { GUILD } from "../errors.json";
import { Request, Response } from "express";
import GuildSchema from "../../schemas/Guild";
import { NOT_FOUND, OK } from "../status-code.json";
import { ExpressResponse, GuildStructure, Schema, Snowflake } from "../../types/types";

/** Get a guild in the database */

export const GET: (req: Request, res: Response) => ExpressResponse = async (req: Request, res: Response): ExpressResponse => {
    const guildId: Snowflake = req.params.id;
    const guild: Schema<GuildStructure> | null = await GuildSchema.findById({ _id: guildId });

    if (!guild) return res.status(NOT_FOUND).json({ message: GUILD.GUILD_NOT_FOUND, code: NOT_FOUND });

    return res.status(OK).json(guild);
};