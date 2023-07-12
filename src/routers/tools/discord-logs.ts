import axios from "axios";
import { BAD_REQUEST } from "./status-code.json";
import { JwtPayload, verify } from "jsonwebtoken";
import { ExpressResponse } from "../../core/types/types";
import { NextFunction, Response, Request } from "express";

export const log: (req: Request, _res: Response, next: NextFunction) => Promise<ExpressResponse | void> = async (req: Request, _res: Response, next: NextFunction): Promise<ExpressResponse | void> => {
    const { CLIENT_TOKEN, WEBHOOK_TOKEN }: NodeJS.ProcessEnv = process.env;

    const payload: JwtPayload = verify(req.headers.authorization as string, process.env.JWT_SECRET as string) as JwtPayload;

    if (!payload.id) return _res.json({ message: "Wow, look at him. Withour JwtPatload is not it?", code: BAD_REQUEST });

    const avatar: string = `https://cdn.discordapp.com/avatars/${payload.id}/${payload.avatar}.png` as const;

    // always returns an empty string
    await axios.post(`https://discord.com/api/v10/webhooks/1125236689485435011/${WEBHOOK_TOKEN}`, { content: `eu usei a api na rota \`${req.path}\``, username: payload.username + ` (${payload.id})`, avatar_url: avatar }, { headers: { Authorization: `Bot ${CLIENT_TOKEN}` } }).catch(console.error);

    next();
};