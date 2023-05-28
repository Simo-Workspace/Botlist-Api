import cors from "cors";
import { connect } from "mongoose";
import rateLimit from "express-rate-limit";
import { MONGOOSE_URL } from "./.config.json";
import { getBot } from "./src/controllers/GET";
import { addBot } from "./src/controllers/POST";
import { editBot } from "./src/controllers/PATCH";
import { updateBot } from "./src/controllers/PUT";
import { PORT, MAIN_ROUTE } from "./constants.json";
import { deleteBot } from "./src/controllers/DELETE";
import { default as express, Express } from "express";
import { MANY_REQUEST } from "./src/controllers/errors.json";
import { TOO_MANY_REQUESTS } from "./src/controllers/status-code.json"

const app: Express = express();

const limiter = rateLimit({
    max: 10,
    message: {
        error: MANY_REQUEST
    },
    statusCode: TOO_MANY_REQUESTS
});

app.use(express.json({ strict: true, limit: '50kb' }), cors(), limiter);
app.route(MAIN_ROUTE).get(getBot).delete(deleteBot).patch(editBot).post(addBot).put(updateBot);

app.listen(PORT, async (): Promise<void> => {
    await connect(MONGOOSE_URL).catch(console.error);

    console.info(`Servidor iniciado na porta ${PORT}`);
});