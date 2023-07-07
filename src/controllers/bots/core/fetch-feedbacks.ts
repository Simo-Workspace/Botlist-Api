import { Request, Response } from "express";
import { FEEDBACK } from "../../errors.json";
import FeedbackSchema from "../../../schemas/Feedback";
import { NOT_FOUND, OK } from "../../status-code.json";
import { FeedbackStructure, Schema } from "../../../types/types";

export const fetchFeedbacks = async (req: Request, res: Response) => {
    const { id: targetBot } = req.params;

    const data: Schema<FeedbackStructure>[] | null = await FeedbackSchema.find({ targetBot });

    if (!data) return res.status(NOT_FOUND).json({ message: FEEDBACK.NO_FEEDBACKS, code: NOT_FOUND });

    return res.status(OK).json(data);
};