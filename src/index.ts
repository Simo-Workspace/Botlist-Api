import cors from "cors";
import { config } from "dotenv";
import { connect } from "mongoose";
import cookieParser from "cookie-parser";
import { GET } from "./controllers/bots/GET";
import { POST } from "./controllers/bots/POST";
import { PATCH } from "./controllers/bots/PATCH";
import { DELETE } from "./controllers/bots/DELETE";
import { GENERICS } from "./controllers/errors.json";
import { default as express, Express } from "express";
import { callback } from "./controllers/bots/GET-AUTH";
import { GET as GET_USER } from "./controllers/users/GET";
import { GET as GET_GUILD } from "./controllers/guilds/GET";
import { POST as POST_GUILD } from "./controllers/guilds/POST";
import { PATCH as PATCH_GUILD } from "./controllers/guilds/PATCH";
import { TOO_MANY_REQUESTS } from "./controllers/status-code.json";
import { DELETE as DELETE_GUILD } from "./controllers/guilds/DELETE";
import { PORT, ROUTES, MAX_REQUESTS_PER_MIN } from "../constants.json";
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";

config();

const app: Express = express();

const limiter: RateLimitRequestHandler = rateLimit({
    max: MAX_REQUESTS_PER_MIN,
    message: {
        error: GENERICS.MANY_REQUEST,
        code: TOO_MANY_REQUESTS
    },
    statusCode: TOO_MANY_REQUESTS
});

app.set('trust proxy', 1)
app.use(express.json({ strict: true, limit: "50kb" }), cors({ credentials: true, origin: ["https://botlist-website.vercel.app", "http://localhost:5173"] }), limiter, cookieParser());

app.route(ROUTES.USER).get(GET_USER);
app.route(ROUTES.AUTH).get(callback);
app.route(ROUTES.BOTS).get(GET).delete(DELETE).patch(PATCH).post(POST);
app.route(ROUTES.GUILD).get(GET_GUILD).delete(DELETE_GUILD).patch(PATCH_GUILD).post(POST_GUILD);

app.listen(PORT, async (): Promise<void> => {
    await connect(process.env.MONGOOSE_URL as string).catch(console.error);
    
    console.info(`Servidor iniciado na porta ${PORT}`);
});