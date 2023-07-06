import cors from "cors";
import { config } from "dotenv";
import { connect } from "mongoose";
import cookieParser from "cookie-parser";
import { GET } from "./controllers/bots/GET";
import { POST } from "./controllers/bots/POST";
import { PATCH } from "./controllers/bots/PATCH";
import { log } from "./controllers/discord-logs";
import { DELETE } from "./controllers/bots/DELETE";
import { GENERICS } from "./controllers/errors.json";
import { default as express, Express } from "express";
import { callback } from "./controllers/auth/GET";
import { auth } from "./middlewares/auth";
import { getToken } from "./controllers/auth/TOKEN";
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

app.set("trust proxy", 1);
app.use(express.json({ strict: true, limit: "50kb" }), cors({ credentials: true, origin: ["https://botlist-website.vercel.app", "http://localhost:5173"] }), limiter, cookieParser());

app.route(ROUTES.USER).get(auth, GET_USER);
app.route(ROUTES.AUTH).get(auth, callback);
app.route(ROUTES.BOTS).get(auth, GET).delete(auth, DELETE).patch(auth, PATCH).post(auth, POST);
app.route(ROUTES.GUILD).get(auth, GET_GUILD).delete(auth, DELETE_GUILD).patch(auth, PATCH_GUILD).post(auth, POST_GUILD);
app.route(ROUTES.TOKEN).get(getToken);

app.listen(PORT, async (): Promise<void> => {
    await connect(process.env.MONGOOSE_URL as string).catch(console.error);
    
    console.info(`API iniciada na porta ${PORT}`);
});

process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);