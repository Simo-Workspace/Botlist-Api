import { Types } from "mongoose";
import { Request, Response } from "express";
import { AUTH } from "../../../.config.json";
import FeedbackSchema from "../../database/Feedback";
import { GENERICS, FEEDBACK } from "../errors.json";
import { REQUIRED_FEEDBACK_PROPERTIES } from "../../../constants.json";
import { ExpressResponse, FeedbackStructure, Snowflake } from "../../types/types";
import { UNAUTHORIZED, BAD_REQUEST, INTERNAL_SERVER_ERROR, CREATED } from "../status-code.json";

/** Send a feedback */

export const POST: (req: Request, res: Response) => ExpressResponse = async (req: Request, res: Response): ExpressResponse => {
    if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: GENERICS.INVALID_AUTH, code: UNAUTHORIZED });

    const author: Snowflake = req.params.user;
    const exists: { _id: Types.ObjectId; } | null = await FeedbackSchema.exists({ author });

    if (exists) return res.status(BAD_REQUEST).json({ message: FEEDBACK.THE_USER_ALREADY_SENT, code: BAD_REQUEST });

    const body: Partial<FeedbackStructure> = req.body;
    const keys: string[] = Object.keys(body);

    if (!REQUIRED_FEEDBACK_PROPERTIES.every((property: string): boolean => keys.includes(property))) return res.status(BAD_REQUEST).json({ message: GENERICS.SOME_PROPERTIES_IS_MISSING, code: BAD_REQUEST });

    const created = await FeedbackSchema.create({ ...body, author });

    if (!created) return res.status(INTERNAL_SERVER_ERROR).json({ message: FEEDBACK.CANNOT_SEND_THE_FEEEDBACK, code: INTERNAL_SERVER_ERROR });

    return res.status(CREATED).json(created);
};