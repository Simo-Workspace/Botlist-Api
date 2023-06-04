import { Request, Response } from "express";
import { AUTH } from "../../../.config.json";
import FeedbackSchema from "../../database/Feedback";
import { REQUIRED_FEEDBACK_PROPERTIES } from "../../../constants.json";
import { ExpressResponsePromise, FeedbackStructure, Snowflake } from "../../types/types";
import { UNAUTHORIZED, BAD_REQUEST, INTERNAL_SERVER_ERROR, CREATED } from "../status-code.json";
import { INVALID_AUTH, THE_USER_ALREADY_SENT, CANNOT_SEND_THE_FEEEDBACK, SOME_PROPERTIES_IS_MISSING } from "../errors.json";

/** Send a feedback */

export const POST: (req: Request, res: Response) => ExpressResponsePromise = async (req: Request, res: Response): ExpressResponsePromise => {
    if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: INVALID_AUTH, code: UNAUTHORIZED });

    const author: Snowflake = req.params.user;
    const exists = await FeedbackSchema.exists({ author });

    if (exists) return res.status(BAD_REQUEST).json({ message: THE_USER_ALREADY_SENT, code: BAD_REQUEST });

    const body: Partial<FeedbackStructure> = req.body;
    const keys: string[] = Object.keys(body);

    if (!REQUIRED_FEEDBACK_PROPERTIES.every((prop: string): boolean => keys.includes(prop))) return res.status(BAD_REQUEST).json({ message: SOME_PROPERTIES_IS_MISSING, code: BAD_REQUEST });

    const created = await FeedbackSchema.create({ ...body, author });

    if (!created) return res.status(INTERNAL_SERVER_ERROR).json({ message: CANNOT_SEND_THE_FEEEDBACK, code: INTERNAL_SERVER_ERROR });

    return res.status(CREATED).json(created);
};