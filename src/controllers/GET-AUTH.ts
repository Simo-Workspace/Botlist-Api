import { Request, Response } from "express";
import { ExpressPromise } from "../typings";
import serialize from "serialize-javascript";
import { DiscordUserStructure } from "../typings";
import { DISCORD_AUTH_ERROR } from "./errors.json";
import { INTERNAL_SERVER_ERROR } from "./status-code.json";
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, SCOPES } from "../../.config.json";

export const callback: (req: Request, res: Response) => ExpressPromise = async (req: Request, res: Response): ExpressPromise => {
	const code = req.query.code;
	const data = {
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		grant_type: "authorization_code",
		code,
		redirect_uri: REDIRECT_URI,
		scope: SCOPES.join(" ")
	};

	try {
		const req = await fetch("https://discord.com/api/v10/oauth2/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(data as Record<string, string>) });
		const tokenResponse = await req.json();

		const accessToken: string = tokenResponse.access_token;
		const request: globalThis.Response = await fetch("https://discord.com/api/v10/users/@me", {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
		const { username, id, avatar }: DiscordUserStructure = await request.json();
		const user: DiscordUserStructure = {
			username: username,
			id: id,
			avatar: avatar
		};

		res.cookie("discordUser", serialize(user), { maxAge: 900000, httpOnly: false });

		res.redirect(REDIRECT_URI);
	} catch (error) {
		console.error(error);

		res.status(INTERNAL_SERVER_ERROR).send({ message: DISCORD_AUTH_ERROR, code: INTERNAL_SERVER_ERROR });
	}
};