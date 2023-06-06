import { Request, Response } from "express";
import { AUTH } from "../../../.config.json";
import { GENERICS, FEEDBACK } from "../errors.json";
import FeedbackSchema from "../../database/Feedback";
import { ExpressResponse, Snowflake } from "../../types/types";
import { UNAUTHORIZED, NOT_FOUND, OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } from "../status-code.json";

/** Delete a feedback */

export const DELETE: (req: Request, res: Response) => ExpressResponse = async (req: Request, res: Response): ExpressResponse => {
    if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: GENERICS.INVALID_AUTH, code: UNAUTHORIZED });

    const { targetBot }: { targetBot: Snowflake | undefined; } = req.body;

    if (!targetBot) return res.status(BAD_REQUEST).json({ message: FEEDBACK.MISSING_TARGETBOT_PROP, code: BAD_REQUEST });

    const author: Snowflake = req.params.user;
    const exists = await FeedbackSchema.exists({ author, targetBot });

    if (!exists) return res.status(NOT_FOUND).json({ message: FEEDBACK.UNKNOWN_FEEDBACK, code: NOT_FOUND });

    const deleted = await FeedbackSchema.findOneAndDelete({ author, targetBot }, { new: true });

    if (!deleted) return res.status(INTERNAL_SERVER_ERROR).json({ message: FEEDBACK.CANNOT_DELETE_THE_FEEEDBACK, code: INTERNAL_SERVER_ERROR });

    return res.status(OK).json(deleted);
};