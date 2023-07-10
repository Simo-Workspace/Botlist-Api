import { Request, Response } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import GuildSchema from "../../core/schemas/Guild";
import { GENERICS, GUILD } from "../tools/errors.json";
import { GuildStructure, ExpressResponse, Schema } from "../../core/types/types";
import { NOT_FOUND, INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from "../tools/status-code.json";

/** Delete a guild */

export const DELETE: (req: Request, res: Response) => ExpressResponse = async (req: Request, res: Response): ExpressResponse => {
    const { id: _id } = req.params;

    const jwtPayload: JwtPayload = verify(req.headers.authorization as string, process.env.JWT_SECRET as string) as JwtPayload;

    const data: Schema<GuildStructure> | null = await GuildSchema.findById({ _id, owners: { $in: [jwtPayload.id] } });

    if (!data) return res.status(NOT_FOUND).json({ message: GUILD.GUILD_NOT_FOUND, code: NOT_FOUND });

    if (!data.owners.includes(jwtPayload.id)) return res.status(UNAUTHORIZED).json({ message: GUILD.NOT_GUILD_OWNER, code: UNAUTHORIZED });

    const deletedGuild: Schema<GuildStructure> | null = await GuildSchema.findByIdAndDelete({ _id }, { new: true });

    if (!deletedGuild) return res.status(INTERNAL_SERVER_ERROR).json({ message: GENERICS.INTERNAL_SERVER_ERROR, code: INTERNAL_SERVER_ERROR });

    return res.status(OK).json(deletedGuild);
};