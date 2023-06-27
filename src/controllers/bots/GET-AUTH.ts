import jwt from "jsonwebtoken";
import { GENERICS } from "../errors.json";
import { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import { UNAUTHORIZED, OK } from "../status-code.json";
import { INTERNAL_SERVER_ERROR } from "../status-code.json";
import { DiscordUserStructure, ExpressResponse } from "../../types/types";

/** Webiste callback */

export const callback: (req: Request, res: Response) => void = async (req: Request, res: Response): Promise<ExpressResponse | void> => {
    const { code } = req.query;
    const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, SCOPES, REDIRECT_AUTH, AUTH_LINK, JWT_SECRET, AUTH, COOKIE_SECRET }: NodeJS.ProcessEnv = process.env;

    const data = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        scope: JSON.parse(SCOPES as string).join(" ")
    };

    if (req.params.method === "user") {
        try {
            // if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: GENERICS.INVALID_AUTH, code: UNAUTHORIZED });
            const userData: string | JwtPayload = jwt.verify(req.cookies.discordUser, JWT_SECRET as string);

            return res.send(userData);
        } catch (error: unknown) {
            return res.status(INTERNAL_SERVER_ERROR).json({ message: JSON.stringify(error), code: INTERNAL_SERVER_ERROR });
        }
    }

    if (req.params.method === "logout") {
        try {
            if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: GENERICS.INVALID_AUTH, code: UNAUTHORIZED });
            
            res.clearCookie("discordUser");

            return res.status(OK).json({ message: GENERICS.SUCCESS, code: OK });
        } catch (error: unknown) {
            return res.status(INTERNAL_SERVER_ERROR).json({ message: GENERICS.DISCORD_AUTH_ERROR, code: INTERNAL_SERVER_ERROR });
        }
    }

    if(req.params.method === "callback") {
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
            const sevenDays: 604800000 = 604800000 as const;

            const token: string = jwt.sign({
            data: { username, id, avatar }
            }, JWT_SECRET as string, { expiresIn: sevenDays });

            res.cookie("discordUser", token, { maxAge: sevenDays });

            res.redirect(REDIRECT_AUTH as string);
        } catch (error: unknown) {
            console.error(error);

            res.status(INTERNAL_SERVER_ERROR).json({ message: GENERICS.DISCORD_AUTH_ERROR, code: INTERNAL_SERVER_ERROR });
        }
    }
};