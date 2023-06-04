import { Request, Response } from "express";
import { AUTH } from "../../../.config.json";
import FeedbackSchema from "../../database/Feedback";
import { ExpressResponsePromise, FeedbackStructure, Snowflake } from "../../typings";
import { UNAUTHORIZED, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR, OK } from "../status-code.json";
import { INVALID_AUTH, MISSING_TARGETBOT_PROP, UNKNOWN_FEEDBACK, CANNOT_SEND_THE_FEEEDBACK } from "../errors.json";

export const PATCH: (req: Request, res: Response) => ExpressResponsePromise = async (req: Request, res: Response): ExpressResponsePromise => {
    if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: INVALID_AUTH, code: UNAUTHORIZED });

    const { content, stars, targetBot }: Partial<Pick<FeedbackStructure, "content" | "stars" | "targetBot">> = req.body;

    if (!targetBot) return res.status(BAD_REQUEST).json({ message: MISSING_TARGETBOT_PROP, code: BAD_REQUEST });

    const author: Snowflake = req.params.user;
    const exists = await FeedbackSchema.exists({ author, targetBot });

    if (!exists) return res.status(NOT_FOUND).json({ message: UNKNOWN_FEEDBACK, code: NOT_FOUND });

    const updated = await FeedbackSchema.findOneAndUpdate({ author, targetBot }, { content, stars }, { new: true });

    if (!updated) return res.status(INTERNAL_SERVER_ERROR).json({ message: CANNOT_SEND_THE_FEEEDBACK, code: INTERNAL_SERVER_ERROR });

    return res.status(OK).json(updated);
};