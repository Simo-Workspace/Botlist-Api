import { Request, Response } from "express";
import { FEEDBACK } from "../tools/errors.json";
import FeedbackSchema from "../../core/schemas/Feedback";
import { NOT_FOUND, OK } from "../tools/status-code.json";
import { ExpressResponse, FeedbackStructure, Schema } from "../../core/types/types";

/**
 * Fetches all feedbacks from a bot
 */

export const fetchFeedbacks: (req: Request, res: Response) => ExpressResponse = async (req: Request, res: Response): ExpressResponse => {
    const { id: targetBot } = req.params;

    const data: Schema<FeedbackStructure>[] | null = await FeedbackSchema.find({ targetBot });

    if (!data || data.length < 1) return res.status(NOT_FOUND).json({ message: FEEDBACK.NO_FEEDBACKS, code: NOT_FOUND });

    return res.status(OK).json(data);
};