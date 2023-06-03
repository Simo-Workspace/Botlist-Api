import cors from "cors";
import { connect } from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import { MONGOOSE_URL } from "./.config.json";
import { COOKIE_SECRET } from "./.config.json";
import { PORT, ROUTES } from "./constants.json";
import { PUT } from "./src/controllers/bots/PUT";
import { GET } from "./src/controllers/bots/GET";
import { POST } from "./src/controllers/bots/POST";
import { PATCH } from "./src/controllers/bots/PATCH";
import { default as express, Express } from "express";
import { DELETE } from "./src/controllers/bots/DELETE";
import { callback } from "./src/controllers/bots/GET-AUTH";
import { MANY_REQUEST } from "./src/controllers/errors.json";
import { GET as GET_USER } from "./src/controllers/users/GET";
import { TOO_MANY_REQUESTS } from "./src/controllers/status-code.json";
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";

const app: Express = express();

const limiter: RateLimitRequestHandler = rateLimit({
	max: 10,
	message: {
		error: MANY_REQUEST,
		code: TOO_MANY_REQUESTS
	},
	statusCode: TOO_MANY_REQUESTS
});

app.use(express.json({ strict: true, limit: "50kb" }), cors({ credentials: true }), limiter, cookieParser(), session({
	secret: COOKIE_SECRET,
	cookie: {
		maxAge: 24 * 60 * 60 * 1000 * 7,
	},
	resave: false,
	saveUninitialized: false,
	name: "discord.login"
}));

app.route(ROUTES.USER).get(GET_USER);
app.route(ROUTES.AUTH).get(callback);
app.route(ROUTES.MAIN).get(GET).delete(DELETE).patch(PATCH).post(POST).put(PUT);

app.listen(PORT, async (): Promise<void> => {
	await connect(MONGOOSE_URL).catch(console.error);
    
	console.info(`Servidor iniciado na porta ${PORT}`);
});