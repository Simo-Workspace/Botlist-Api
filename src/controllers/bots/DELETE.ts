import { Types } from "mongoose";
import { Request, Response } from "express";
import BotSchema  from "../../schemas/Bot";
import FeedbackSchema from "../../schemas/Feedback";
import { GENERICS, BOT, FEEDBACK } from "../errors.json";
import { NOT_FOUND, OK, INTERNAL_SERVER_ERROR } from "../status-code.json";
import { BotStructure, ExpressResponse, FeedbackStructure, Schema, Snowflake } from "../../types/types";

/** Delete a bot or a feedback */

export const DELETE: (req: Request, res: Response) => ExpressResponse = async (req: Request, res: Response): ExpressResponse => {
    const { id: _id, method, user: author } = req.params;

    if (method === "feedbacks") {
        const exists: { _id: Types.ObjectId; } | null = await FeedbackSchema.exists({ targetBot: _id, author });

        if (!exists) return res.status(NOT_FOUND).json({ message: FEEDBACK.UNKNOWN_FEEDBACK, code: NOT_FOUND });

        const deleted: Schema<FeedbackStructure> | null = await FeedbackSchema.findOneAndDelete({ author, targetBot: _id }, { new: true });

        return res.status(OK).json(deleted);
    }

    const exists: { _id: Snowflake; } | null = await BotSchema.exists({ _id });

    if (!exists) return res.status(NOT_FOUND).json({ message: BOT.BOT_NOT_FOUND, code: NOT_FOUND });

    const deletedBot: Schema<BotStructure> | null = await BotSchema.findByIdAndDelete({ _id }, { new: true });

    if (!deletedBot) return res.status(INTERNAL_SERVER_ERROR).json({ message: GENERICS.INTERNAL_SERVER_ERROR, code: INTERNAL_SERVER_ERROR });

    return res.status(OK).json(deletedBot);
};