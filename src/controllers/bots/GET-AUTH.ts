import { GENERICS } from "../errors.json";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { DiscordUserStructure } from "../../types/types";
import { INTERNAL_SERVER_ERROR } from "../status-code.json";
import { UNAUTHORIZED, NOT_FOUND, OK, BAD_REQUEST } from "../status-code.json";

/** Webiste callback */

export const callback = async (req: Request, res: Response) => {
    const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, SCOPES, REDIRECT_AUTH, AUTH_LINK, JWT_SECRET, AUTH }: NodeJS.ProcessEnv = process.env;
    const { code } = req.query;

    const data = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        scope: JSON.parse(SCOPES as string).join(" ")
    };

    if(req.params.method === 'user') {
        try {
            if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: GENERICS.INVALID_AUTH, code: UNAUTHORIZED });
            const userData = jwt.verify(req.cookies.discordUser, JWT_SECRET as string)
            return res.json(userData);
        } catch(error: unknown) {
            return res.json({ message: 'Token error, try sigin it again' })
        }
    }

    try {
        
        const req: globalThis.Response = await fetch("https://discord.com/api/v10/oauth2/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(data as Record<string, string>) });
        const response: { error: string; access_token: string; } = await req.json();

        if (response.error === "invalid_grant") return res.redirect(AUTH_LINK as string);

        const accessToken: string = response.access_token;
        const request: globalThis.Response = await fetch("https://discord.com/api/v10/users/@me", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const { username, id, avatar }: DiscordUserStructure = await request.json();
        const user: DiscordUserStructure = {
            username,
            id,
            avatar
        };

        const token = jwt.sign({
            data: user
          }, JWT_SECRET as string, { expiresIn: 24 * 60 * 60 * 1000 * 7 });

        res.cookie("discordUser", token, { maxAge: 24 * 60 * 60 * 1000 * 7, httpOnly: true });

        res.redirect(REDIRECT_AUTH as string);
    } catch (error: unknown) {
        console.error(error);

        res.status(INTERNAL_SERVER_ERROR).json({ message: GENERICS.DISCORD_AUTH_ERROR, code: INTERNAL_SERVER_ERROR });
    }
};