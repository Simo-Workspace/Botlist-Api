import { AUTH } from "../../.config.json";
import { Request, Response } from "express";
import { default as BotSchema } from "../database/BotSchema";
import { REQUIRED_BOT_PROPERTIES } from "../../constants.json";
import type { BotStructure, ExpressPromise, Snowflake } from "../typings";
import { INVALID_AUTH, CANNOT_CREATE_THE_BOT, BOT_ALREADY_EXISTS, SOME_PROPERTIES_IS_MISSING } from "./errors.json";

export const addBot: (req: Request, res: Response) => ExpressPromise = async (req: Request, res: Response): ExpressPromise => {
    if (req.headers.authorization !== AUTH) return res.json({ error: INVALID_AUTH });

    const properties: Partial<BotStructure> = req.body;
    const keys: string[] = Object.keys(properties);

    if (REQUIRED_BOT_PROPERTIES.every((prop: string): boolean => keys.includes(prop))) return res.json({ error: SOME_PROPERTIES_IS_MISSING });

    const _id: Snowflake = req.params.id;
    const exists: { _id: Snowflake; } | null = await BotSchema.exists({ _id });

    if (exists) return res.json({ error: BOT_ALREADY_EXISTS });

    const created = await BotSchema.create({ ...properties, _id });

    if (!created) return res.json({ error: CANNOT_CREATE_THE_BOT });

    return res.json(created);
};