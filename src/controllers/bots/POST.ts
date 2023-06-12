import { Request, Response } from "express";
import { AUTH } from "../../../.config.json";
import { GENERICS, BOT } from "../errors.json";
import { default as BotSchema } from "../../database/Bot";
import { REQUIRED_BOT_PROPERTIES } from "../../../constants.json";
import type { BotStructure, ExpressResponse, Snowflake } from "../../types/types";
import { UNAUTHORIZED, BAD_REQUEST, INTERNAL_SERVER_ERROR, CREATED } from "../status-code.json";

/** Create a bot */

export const POST: (req: Request, res: Response) => ExpressResponse = async (req: Request, res: Response): ExpressResponse => {
    if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: GENERICS.INVALID_AUTH, code: UNAUTHORIZED });

    if (req.params.method === "votes") {
        return res.json({ areSpyeiGay: true, code: "gay" });
    }

    const _id: Snowflake = req.params.id;
    const properties: Partial<BotStructure> = req.body;
    const keys: string[] = Object.keys(properties);

    if (!REQUIRED_BOT_PROPERTIES.every((property: string): boolean => keys.includes(property))) return res.status(BAD_REQUEST).json({ message: GENERICS.SOME_PROPERTIES_IS_MISSING, code: BAD_REQUEST });

    const exists: { _id: Snowflake; } | null = await BotSchema.exists({ _id });

    if (exists) return res.status(BAD_REQUEST).json({ message: BOT.BOT_ALREADY_EXISTS, code: BAD_REQUEST });

    const created = await BotSchema.create({ ...properties, _id });

    if (!created) return res.status(INTERNAL_SERVER_ERROR).json({ message: BOT.CANNOT_CREATE_THE_BOT, code: INTERNAL_SERVER_ERROR });

    return res.status(CREATED).json(created);
};