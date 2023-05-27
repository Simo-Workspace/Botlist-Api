import { AUTH } from "../../.config.json";
import { Request, Response } from "express";
import { ExpressPromise } from "../typings";
import { INVALID_AUTH, BOT_NOT_FOUND } from "./errors.json";
import { default as BotSchema } from "../database/BotSchema";

export const deleteBot: (req: Request, res: Response) => ExpressPromise = async (req: Request, res: Response): ExpressPromise => {
    if (req.headers.authorization !== AUTH) return res.json({ error: INVALID_AUTH });

    const _id: string = req.params.id;
    const deletedBot = await BotSchema.findByIdAndDelete({ _id }, { new: true });

    if (!deletedBot) return res.json({ error: BOT_NOT_FOUND });

    return res.json(deletedBot);
};