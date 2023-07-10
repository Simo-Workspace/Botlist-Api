import BotSchema from "../../core/schemas/Bot";
import { Request, Response } from "express";
import { GENERICS, BOT } from "../errors.json";
import { BAD_REQUEST, OK } from "../status-code.json";
import { BotStructure, ExpressResponse, Schema, VoteStructure } from "../../core/types/types";

/**
 * View informations about an user vote
 */

export const voteStatus: (req: Request, res: Response) => ExpressResponse = async (req: Request, res: Response): ExpressResponse => {
    const { id: _id, user } = req.params;

    if (!user) return res.status(BAD_REQUEST).json({ message: GENERICS.MISSING_USER, code: BAD_REQUEST });

    const data: Schema<BotStructure> | null = await BotSchema.findById({ _id });

    if (!data) return res.status(BAD_REQUEST).json({ message: BOT.BOT_NOT_FOUND, code: BAD_REQUEST });

    const vote = data.votes.find((vote: VoteStructure): boolean => vote.user === user);

    if (!vote) return res.status(OK).json({ canVote: true, restTime: "" });

    const twelveHours: 43200000 = 4.32e+7;
    const timeLeft: number = (new Date().getTime() - new Date(vote.lastVote).getTime());

    return res.status(OK).json({ canVote: timeLeft > twelveHours, restTime: timeLeft > twelveHours ? "" : twelveHours - timeLeft });
};