import { Types } from "mongoose";
import BotSchema from "../../schemas/Bot";
import { Request, Response } from "express";
import FeedbackSchema from "../../schemas/Feedback";
import { GENERICS, BOT, FEEDBACK } from "../errors.json";
import { NOT_FOUND, INTERNAL_SERVER_ERROR, OK } from "../status-code.json";
import { BotStructure, ExpressResponse, FeedbackStructure, Schema, Snowflake } from "../../types/types";

/** Edit a bot, or edit a feedback */

export const PATCH: (req: Request, res: Response) => ExpressResponse = async (req: Request, res: Response): ExpressResponse => {
    const { _id, method, user: author } = req.params;

    if (method === "feedbacks") {
        const { content, stars }: Partial<Pick<FeedbackStructure, "content" | "stars">> = req.body;

        const exists: { _id: Types.ObjectId; } | null = await FeedbackSchema.exists({ author, targetBot: _id });

        if (!exists) return res.status(NOT_FOUND).json({ message: FEEDBACK.UNKNOWN_FEEDBACK, code: NOT_FOUND });

        const updated: Schema<FeedbackStructure> | null = await FeedbackSchema.findOneAndUpdate({ author, targetBot: _id }, { content, stars }, { new: true });

        if (!updated) return res.status(INTERNAL_SERVER_ERROR).json({ message: GENERICS.INTERNAL_SERVER_ERROR, code: INTERNAL_SERVER_ERROR });

        return res.status(OK).json(updated);
    }

    const exists: { _id: Snowflake; } | null = await BotSchema.exists({ _id });

    if (!exists) return res.status(NOT_FOUND).json({ message: BOT.BOT_NOT_FOUND, code: NOT_FOUND });

    const updated: Schema<BotStructure> | null = await BotSchema.findByIdAndUpdate({ _id }, req.body, { new: true });

    if (!updated) return res.status(INTERNAL_SERVER_ERROR).json({ message: GENERICS.INTERNAL_SERVER_ERROR, code: INTERNAL_SERVER_ERROR });

    return res.status(OK).json(updated);
};