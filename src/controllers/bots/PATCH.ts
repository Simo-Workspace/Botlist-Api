import { Types } from "mongoose";
import BotSchema from "../../schemas/Bot";
import { Request, Response } from "express";
import { Checkers } from "../core/Checkers";
import { verify, JwtPayload } from "jsonwebtoken";
import FeedbackSchema from "../../schemas/Feedback";
import { GENERICS, BOT, FEEDBACK } from "../errors.json";
import { BotStructure, ExpressResponse, FeedbackStructure, Schema } from "../../types/types";
import { NOT_FOUND, INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED, BAD_REQUEST } from "../status-code.json";

/** Edit a bot, or edit a feedback */

export const PATCH: (req: Request, res: Response) => ExpressResponse = async (req: Request, res: Response): ExpressResponse => {
    const { _id, method, user: author } = req.params;

    if (method === "feedbacks") {
        const { content, stars }: Partial<Pick<FeedbackStructure, "content" | "stars">> = req.body;

        const exists: { _id: Types.ObjectId; } | null = await FeedbackSchema.exists({ author, targetBot: _id });

        if (!exists) return res.status(NOT_FOUND).json({ message: FEEDBACK.UNKNOWN_FEEDBACK, code: NOT_FOUND });
        if (!Checkers.Feedback.__match({ content, stars })) return res.status(BAD_REQUEST).json({ message: GENERICS.INVALID_PROPS, code: BAD_REQUEST });

        const updated: Schema<FeedbackStructure> | null = await FeedbackSchema.findOneAndUpdate({ author, targetBot: _id }, { content, stars }, { new: true });

        if (!updated) return res.status(INTERNAL_SERVER_ERROR).json({ message: GENERICS.INTERNAL_SERVER_ERROR, code: INTERNAL_SERVER_ERROR });

        return res.status(OK).json(updated);
    }

    const data: Schema<BotStructure> | null = await BotSchema.findById({ _id, owners: { $in: [author] } });

    if (!data) return res.status(NOT_FOUND).json({ message: BOT.BOT_NOT_FOUND, code: NOT_FOUND });

    const payload: JwtPayload = verify(req.headers.authorization as string, process.env.JWT_SECRET as string) as JwtPayload;

    if (!data.owners.includes(payload.id)) return res.status(UNAUTHORIZED).json({ error: BOT.NOT_BOT_OWNER, code: UNAUTHORIZED });

    if (!Checkers.Bot.__match(req.body)) return res.status(BAD_REQUEST).json({ message: GENERICS.INVALID_PROPS, code: BAD_REQUEST });
    const updated: Schema<BotStructure> | null = await BotSchema.findByIdAndUpdate({ _id }, req.body, { new: true });

    if (!updated) return res.status(INTERNAL_SERVER_ERROR).json({ message: GENERICS.INTERNAL_SERVER_ERROR, code: INTERNAL_SERVER_ERROR });

    return res.status(OK).json(updated);
};