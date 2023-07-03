import axios from "axios";
import { NextFunction, Response, Request } from "express";

export async function log(_req: Request, _res: Response, next: NextFunction) {
    const { CLIENT_TOKEN, WEBHOOK_TOKEN }: NodeJS.ProcessEnv = process.env;

    const unrealAvatar: string = "https://images-ext-2.discordapp.net/external/-VaLg9FA0vmfvZ9Dryw4bjQ9UR4fulZM0zJdBpRtznU/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/963124227911860264/54a1a97acc406fc32e052f408ed38ad2.png" as const;
    
    // always returns an empty string
    await axios.post(`https://discord.com/api/v10/webhooks/1125236689485435011/${WEBHOOK_TOKEN}`, { content: "alguém usou a api", username: "ur mom", avatar_url: unrealAvatar }, { headers: { Authorization: `Bot ${CLIENT_TOKEN}` } }).catch(console.error);

    next();
}