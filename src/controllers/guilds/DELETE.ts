import { Request, Response } from "express";
import { AUTH } from "../../../.config.json";
import BotSchema from "../../database/BotSchema";
import { ExpressResponsePromise, Snowflake } from "../../typings";
import { INVALID_AUTH, GUILD_NOT_FOUND, CANNOT_DELETE_THE_GUILD } from "../errors.json";
import { UNAUTHORIZED, NOT_FOUND, INTERNAL_SERVER_ERROR, OK } from "../status-code.json";

/** Delete a guild */

export const DELETE: (req: Request, res: Response) => ExpressResponsePromise = async (req: Request, res: Response): ExpressResponsePromise => {
    if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: INVALID_AUTH, code: UNAUTHORIZED });

    const _id: Snowflake = req.params.id;
    const exists: { _id: Snowflake; } | null = await BotSchema.exists({ _id });

    if (!exists) return res.status(NOT_FOUND).json({ message: GUILD_NOT_FOUND, code: NOT_FOUND });

    const deletedGuild = await BotSchema.findByIdAndDelete({ _id }, { new: true });

    if (!deletedGuild) return res.status(INTERNAL_SERVER_ERROR).json({ message: CANNOT_DELETE_THE_GUILD, code: INTERNAL_SERVER_ERROR });

    return res.status(OK).json(deletedGuild);
};