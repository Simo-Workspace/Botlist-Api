import cors from "cors";
import { connect } from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { PUT } from "./src/controllers/PUT";
import { GET } from "./src/controllers/GET";
import { MONGOOSE_URL } from "./.config.json";
import { POST } from "./src/controllers/POST";
import { COOKIE_SECRET } from "./.config.json";
import { PATCH } from "./src/controllers/PATCH";
import { DELETE } from "./src/controllers/DELETE";
import { PORT, MAIN_ROUTE } from "./constants.json";
import { default as express, Express } from "express";
import { callback } from "./src/controllers/GET-AUTH";
import { MANY_REQUEST } from "./src/controllers/errors.json";
import { TOO_MANY_REQUESTS } from "./src/controllers/status-code.json";

const app: Express = express();

const limiter = rateLimit({
	max: 10,
	message: {
		error: MANY_REQUEST
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

app.route("/auth/callback").get(callback);
app.route(MAIN_ROUTE).get(GET).delete(DELETE).patch(PATCH).post(POST).put(PUT);

app.listen(PORT, async (): Promise<void> => {
	await connect(MONGOOSE_URL).catch(console.error);
    
	console.info(`Servidor iniciado na porta ${PORT}`);
});