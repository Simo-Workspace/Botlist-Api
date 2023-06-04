import { Request, Response } from "express";
import { AUTH } from "../../../.config.json";
import GuildSchema from "../../database/Guild";
import { ExpressResponsePromise, Snowflake, GuildStructure } from "../../types/types";
import { INVALID_AUTH, CANNOT_EDIT_THE_GUILD, GUILD_NOT_FOUND } from "../errors.json";
import { UNAUTHORIZED, NOT_FOUND, INTERNAL_SERVER_ERROR, OK } from "../status-code.json";

/** Edit a guild */

export const PATCH: (req: Request, res: Response) => ExpressResponsePromise = async (req: Request, res: Response): ExpressResponsePromise => {
    if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: INVALID_AUTH, code: UNAUTHORIZED });

    const _id = req.params.id;
    const exists: { _id: Snowflake; } | null = await GuildSchema.exists({ _id });

    if (!exists) return res.status(NOT_FOUND).json({ message: GUILD_NOT_FOUND, code: NOT_FOUND });

    const bodyData: Partial<GuildStructure> = req.body;
    const updated = await GuildSchema.findByIdAndUpdate({ _id }, { ...bodyData, _id }, { new: true });

    if (!updated) return res.status(INTERNAL_SERVER_ERROR).json({ message: CANNOT_EDIT_THE_GUILD, code: INTERNAL_SERVER_ERROR });

    return res.status(OK).json(updated);
};