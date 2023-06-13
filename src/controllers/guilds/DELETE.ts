import BotSchema from "../../database/Bot";
import { Request, Response } from "express";
import { GENERICS, GUILD } from "../errors.json";
import { ExpressResponse, Snowflake } from "../../types/types";
import { UNAUTHORIZED, NOT_FOUND, INTERNAL_SERVER_ERROR, OK } from "../status-code.json";

/** Delete a guild */

export const DELETE: (req: Request, res: Response) => ExpressResponse = async (req: Request, res: Response): ExpressResponse => {
    const { AUTH }: NodeJS.ProcessEnv = process.env;
    
    if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: GENERICS.INVALID_AUTH, code: UNAUTHORIZED });

    const _id: Snowflake = req.params.id;
    const exists: { _id: Snowflake; } | null = await BotSchema.exists({ _id });

    if (!exists) return res.status(NOT_FOUND).json({ message: GUILD.GUILD_NOT_FOUND, code: NOT_FOUND });

    const deletedGuild = await BotSchema.findByIdAndDelete({ _id }, { new: true });

    if (!deletedGuild) return res.status(INTERNAL_SERVER_ERROR).json({ message: GUILD.CANNOT_DELETE_THE_GUILD, code: INTERNAL_SERVER_ERROR });

    return res.status(OK).json(deletedGuild);
};