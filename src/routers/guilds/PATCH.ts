import { Checkers } from "../core/Checkers";
import { Request, Response } from "express";
import { GENERICS, GUILD } from "../errors.json";
import { verify, JwtPayload } from "jsonwebtoken";
import GuildSchema from "../../core/schemas/Guild";
import { BotStructure, ExpressResponse, GuildStructure, Schema } from "../../core/types/types";
import { NOT_FOUND, INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED, BAD_REQUEST } from "../status-code.json";

/** Edit a guild */

export const PATCH: (req: Request, res: Response) => ExpressResponse = async (req: Request, res: Response): ExpressResponse => {
    const { id: _id } = req.params;

    const jwtPayload: JwtPayload = verify(req.headers.authorization as string, process.env.JWT_SECRET as string) as JwtPayload;

    const data: Schema<BotStructure> | null = await GuildSchema.findById({ _id, owners: { $in: [jwtPayload.id] } });

    if (!data) return res.status(NOT_FOUND).json({ message: GUILD.GUILD_NOT_FOUND, code: NOT_FOUND });

    if (!data.owners.includes(jwtPayload.id)) return res.status(UNAUTHORIZED).json({ message: GUILD.NOT_GUILD_OWNER, code: UNAUTHORIZED });

    const bodyData: Partial<GuildStructure> = req.body;

    if (!Checkers.Guild.__match(bodyData)) return res.status(BAD_REQUEST).json({ message: GENERICS.INVALID_PROPS, code: BAD_REQUEST });

    const updated: Schema<GuildStructure> | null = await GuildSchema.findByIdAndUpdate({ _id }, bodyData, { new: true });

    if (!updated) return res.status(INTERNAL_SERVER_ERROR).json({ message: GENERICS.INTERNAL_SERVER_ERROR, code: INTERNAL_SERVER_ERROR });

    return res.status(OK).json(updated);
};