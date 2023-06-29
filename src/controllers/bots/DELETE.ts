import { Types } from "mongoose";
import { Request, Response } from "express";
import BotSchema  from "../../database/Bot";
import FeedbackSchema from "../../database/Feedback";
import { GENERICS, BOT, FEEDBACK } from "../errors.json";
import { UNAUTHORIZED, NOT_FOUND, OK, INTERNAL_SERVER_ERROR } from "../status-code.json";
import { BotStructure, ExpressResponse, FeedbackStructure, Schema, Snowflake } from "../../types/types";

/** Delete a bot or a feedback */

export const DELETE: (req: Request, res: Response) => ExpressResponse = async (req: Request, res: Response): ExpressResponse => {
    const { AUTH }: NodeJS.ProcessEnv = process.env;
    
    if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: GENERICS.INVALID_AUTH, code: UNAUTHORIZED });

    const _id: Snowflake = req.params.id;

    if (req.params.method === "feedbacks") {
        const author: Snowflake = req.params.user;
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