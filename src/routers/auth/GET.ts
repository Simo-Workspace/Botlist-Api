import axios from "axios";
import { OK } from "../status-code.json";
import { GENERICS } from "../errors.json";
import { Request, Response } from "express";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { INTERNAL_SERVER_ERROR } from "../status-code.json";
import { APIScopes, DiscordUserStructure, ExpressResponse, Snowflake } from "../../types/types";

/** Webiste callback */

export const callback: (req: Request, res: Response) => void = async (req: Request, res: Response): Promise<ExpressResponse | void> => {
    const { code } = req.query;
    const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, SCOPES, REDIRECT_AUTH, AUTH_LINK, JWT_SECRET, WEBHOOK_TOKEN, CLIENT_TOKEN }: NodeJS.ProcessEnv = process.env;

    const data: { client_id: Snowflake; client_secret: string; grant_type: string; code: unknown; redirect_uri: string; scope: APIScopes[]; } = {
        client_id: CLIENT_ID as Snowflake,
        client_secret: CLIENT_SECRET as string,
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI as string,
        scope: JSON.parse(SCOPES as string).join(" ")
    };
    const { method } = req.params;

    if (method === "user") {
        try {
            const userData: string | JwtPayload = verify(req.cookies.discordUser, JWT_SECRET as string);

            return res.send(userData);
        } catch (error: unknown) {
            return res.status(INTERNAL_SERVER_ERROR).json({ message: JSON.stringify(error), code: INTERNAL_SERVER_ERROR });
        }
    }

    if (method === "logout") {
        try {
            res.clearCookie("discordUser");

            return res.status(OK).json({ message: GENERICS.SUCCESS, code: OK });
        } catch (error: unknown) {
            return res.status(INTERNAL_SERVER_ERROR).json({ message: GENERICS.DISCORD_AUTH_ERROR, code: INTERNAL_SERVER_ERROR });
        }
    }

    if (method === "callback") {
        try {
            const req: globalThis.Response = await fetch("https://discord.com/api/v10/oauth2/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(data as unknown as Record<string, string>) });
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

            const token: string = sign(
                { username, id, avatar },
                JWT_SECRET as string);

            await axios.post(`https://discord.com/api/webhooks/1125236689485435011/${WEBHOOK_TOKEN}`,
                {
                    username: "Api Logs",
                    avatar_url: "https://cdn.discordapp.com/avatars/908442729145569300/471c2723ba426df10c25190d8deb17a5.png?size=2048",
                    embeds: [
                        {
                            title: "Login Logs",
                            color: 65441,
                            fields: [
                                {
                                    name: "Informações",
                                    value: `O usuario **${username}**, com o ID: **${id}** fez um novo login.`,
                                    inline: false,
                                },
                                {
                                    name: "Sessão",
                                    value: `A sessão do usuário expira <t:${Math.round(Date.now() / 1000 + 604800)}:R>.`,
                                    inline: false,
                                },
                                {
                                    name: "JsonWebtoken",
                                    value: `O JWT da sessão atual é: ||${token}||`,
                                    inline: false,
                                }
                            ],
                            thumbnail: {
                                url: `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=2048`
                            }
                        }
                    ]
                },
                {
                    headers: {
                        Authorization: `Bot ${CLIENT_TOKEN}`
                    }
                });

            res.cookie("discordUser", token, { maxAge: sevenDays });

            res.redirect(REDIRECT_AUTH as string);
        } catch {
            res.status(INTERNAL_SERVER_ERROR).json({ message: GENERICS.DISCORD_AUTH_ERROR, code: INTERNAL_SERVER_ERROR });
        }
    }
};