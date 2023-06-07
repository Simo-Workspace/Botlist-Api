import { Types } from "mongoose";
import { Request, Response } from "express";
import { AUTH } from "../../../.config.json";
import { GENERICS, FEEDBACK } from "../errors.json";
import FeedbackSchema from "../../database/Feedback";
import { ExpressResponse, FeedbackStructure, Snowflake } from "../../types/types";
import { UNAUTHORIZED, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR, OK } from "../status-code.json";

export const PATCH: (req: Request, res: Response) => ExpressResponse = async (req: Request, res: Response): ExpressResponse => {
    if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: GENERICS.INVALID_AUTH, code: UNAUTHORIZED });

    const { content, stars, targetBot }: Partial<Pick<FeedbackStructure, "content" | "stars" | "targetBot">> = req.body;

    if (!targetBot) return res.status(BAD_REQUEST).json({ message: FEEDBACK.MISSING_TARGETBOT_PROP, code: BAD_REQUEST });

    const author: Snowflake = req.params.user;
    const exists: { _id: Types.ObjectId; } | null = await FeedbackSchema.exists({ author, targetBot });

    if (!exists) return res.status(NOT_FOUND).json({ message: FEEDBACK.UNKNOWN_FEEDBACK, code: NOT_FOUND });

    const updated = await FeedbackSchema.findOneAndUpdate({ author, targetBot }, { content, stars }, { new: true });

    if (!updated) return res.status(INTERNAL_SERVER_ERROR).json({ message: FEEDBACK.CANNOT_SEND_THE_FEEEDBACK, code: INTERNAL_SERVER_ERROR });

    return res.status(OK).json(updated);
};