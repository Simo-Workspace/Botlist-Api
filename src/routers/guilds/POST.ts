import { Request, Response } from "express";
import { Checkers } from "../helpers/Checkers";
import { GENERICS, GUILD } from "../errors.json";
import GuildSchema from "../../core/schemas/Guild";
import { REQUIRED_PROPS } from "../../../constants.json";
import {BAD_REQUEST, INTERNAL_SERVER_ERROR, CREATED } from "../status-code.json";
import { GuildStructure, ExpressResponse, Snowflake, Schema } from "../../core/types/types";

/** Create a guild */

export const POST: (req: Request, res: Response) => ExpressResponse = async (req: Request, res: Response): ExpressResponse => {
    const { id: _id } = req.params;
    const properties: Partial<GuildStructure> = req.body;
    const keys: string[] = Object.keys(properties);

    if (!REQUIRED_PROPS.GUILD.every((prop: string): boolean => keys.includes(prop))) return res.status(BAD_REQUEST).json({ message: GENERICS.SOME_PROPERTIES_IS_MISSING, code: BAD_REQUEST, bonus: { missing_properties: REQUIRED_PROPS.GUILD.filter((property: string): boolean => !keys.includes(property)) } });
    if (!Checkers.Guild.validate(properties)) return res.status(BAD_REQUEST).json({ message: GENERICS.INVALID_PROPS, code: BAD_REQUEST });

    const exists: { _id: Snowflake; } | null = await GuildSchema.exists({ _id });

    if (exists) return res.status(BAD_REQUEST).json({ message: GUILD.GUILD_ALREADY_EXISTS, code: BAD_REQUEST });

    const created: Schema<GuildStructure> = await GuildSchema.create({ ...properties, _id });

    if (!created) return res.status(INTERNAL_SERVER_ERROR).json({ message: GENERICS.INTERNAL_SERVER_ERROR, code: INTERNAL_SERVER_ERROR });

    return res.status(CREATED).json(created);
};