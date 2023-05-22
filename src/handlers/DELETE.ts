import { AUTH } from "../../.config.json";
import { Request, Response } from "express";
import { default as BotSchema } from "../schemas/Bot";
import { INVALID_AUTH, BOT_NOT_FOUND } from "./errors.json";

export const deleteBot = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    if (req.headers.authorization !== AUTH) return res.json({ error: INVALID_AUTH });

    const _id: string = req.params.id;
    const deletedBot = await BotSchema.findByIdAndDelete({ _id });

    if (!deleteBot) return res.json({ error: BOT_NOT_FOUND });

    return res.json(deletedBot);
};