import { Request, Response } from "express";
import { AUTH } from "../../../.config.json";
import FeedbackSchema from "../../database/Feedback";
import { ExpressResponsePromise, Snowflake } from "../../typings";
import { UNAUTHORIZED, NOT_FOUND, OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } from "../status-code.json";
import { INVALID_AUTH, MISSING_TARGETBOT_PROP, UNKNOWN_FEEDBACK, CANNOT_DELETE_THE_FEEEDBACK } from "../errors.json";

/** Delete a feedback */

export const DELETE: (req: Request, res: Response) => ExpressResponsePromise = async (req: Request, res: Response): ExpressResponsePromise => {
    if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: INVALID_AUTH, code: UNAUTHORIZED });

    const { targetBot }: { targetBot: Snowflake | undefined; } = req.body;

    if (!targetBot) return res.status(BAD_REQUEST).json({ message: MISSING_TARGETBOT_PROP, code: BAD_REQUEST });

    const author: Snowflake = req.params.user;
    const exists = await FeedbackSchema.exists({ author, targetBot });

    if (!exists) return res.status(NOT_FOUND).json({ message: UNKNOWN_FEEDBACK, code: NOT_FOUND });

    const deleted = await FeedbackSchema.findOneAndDelete({ author, targetBot }, { new: true });

    if (!deleted) return res.status(INTERNAL_SERVER_ERROR).json({ message: CANNOT_DELETE_THE_FEEEDBACK, code: INTERNAL_SERVER_ERROR });

    return res.status(OK).json(deleted);
};