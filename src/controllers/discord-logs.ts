import axios from "axios";
import { NextFunction, Response, Request } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

export async function log(req: Request, _res: Response, next: NextFunction) {
    const { CLIENT_TOKEN, WEBHOOK_TOKEN }: NodeJS.ProcessEnv = process.env;

    const payload: JwtPayload = verify(req.headers.authorization as string, process.env.JWT_SECRET as string) as JwtPayload;

    const avatar: string = `https://cdn.discordapp.com/avatars/${payload.id}/${payload.avatar}.png` as const;

    // always returns an empty string
    await axios.post(`https://discord.com/api/v10/webhooks/1125236689485435011/${WEBHOOK_TOKEN}`, { content: `eu usei a api na rota \`${req.path}\``, username: payload.username, avatar_url: avatar }, { headers: { Authorization: `Bot ${CLIENT_TOKEN}` } }).catch(console.error);

    next();
}