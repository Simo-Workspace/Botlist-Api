import cors from "cors";
import { config } from "dotenv";
import { connect } from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import { PORT, ROUTES } from "./constants.json";
import { GET } from "./src/controllers/bots/GET";
import { POST } from "./src/controllers/bots/POST";
import { PATCH } from "./src/controllers/bots/PATCH";
import { default as express, Express } from "express";
import { DELETE } from "./src/controllers/bots/DELETE";
import { GENERICS } from "./src/controllers/errors.json";
import { callback } from "./src/controllers/bots/GET-AUTH";
import { GET as GET_USER } from "./src/controllers/users/GET";
import { GET as GET_GUILD } from "./src/controllers/guilds/GET";
import { POST as POST_GUILD } from "./src/controllers/guilds/POST";
import { PATCH as PATCH_GUILD } from "./src/controllers/guilds/PATCH";
import { TOO_MANY_REQUESTS } from "./src/controllers/status-code.json";
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import { DELETE as DELETE_GUILD } from "./src/controllers/guilds/DELETE";
import { POST as POST_FEEDBACK } from "./src/controllers/feedbacks/POST";
import { PATCH as PATCH_FEEDBACK } from "./src/controllers/feedbacks/PATCH";
import { DELETE as DELETE_FEEDBACK } from "./src/controllers/feedbacks/DELETE";

config();

const app: Express = express();

const limiter: RateLimitRequestHandler = rateLimit({
    max: 10,
    message: {
        error: GENERICS.MANY_REQUEST,
        code: TOO_MANY_REQUESTS
    },
    statusCode: TOO_MANY_REQUESTS
});

const sevenDays: number = 24 * 60 * 60 * 1000 * 7;

app.use(express.json({ strict: true, limit: "50kb" }), cors({ credentials: true }), limiter, cookieParser(), session({
    secret: process.env.COOKIE_SECRET as string,
    cookie: {
        maxAge: sevenDays,
    },
    resave: false,
    saveUninitialized: false,
    name: "discord.login"
}));

app.route(ROUTES.USER).get(GET_USER);
app.route(ROUTES.AUTH).get(callback);
app.route(ROUTES.BOTS).get(GET).delete(DELETE).patch(PATCH).post(POST);
app.route(ROUTES.FEEDBACK).patch(PATCH_FEEDBACK).delete(DELETE_FEEDBACK).post(POST_FEEDBACK);
app.route(ROUTES.GUILD).get(GET_GUILD).delete(DELETE_GUILD).patch(PATCH_GUILD).post(POST_GUILD);

app.listen(PORT, async (): Promise<void> => {
    await connect(process.env.MONGOOSE_URL as string).catch(console.error);
    
    console.info(`Servidor iniciado na porta ${PORT}`);
});