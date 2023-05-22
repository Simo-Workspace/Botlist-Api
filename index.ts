import cors from "cors";
import { connect } from "mongoose";
import { addBot } from "./src/handlers/PUT";
import { getBot } from "./src/handlers/GET";
import { editBot } from "./src/handlers/PATCH";
import { deleteBot } from "./src/handlers/DELETE";
import { default as express, Express } from "express";
import { PORT, MAIN_ROUTE, MONGOOSE_URL } from "./.config.json";

const app: Express = express();

app.use(express.json(), cors());
app.route(MAIN_ROUTE).get(getBot).delete(deleteBot).patch(editBot).put(addBot);

app.listen(PORT, async (): Promise<void> => {
    await connect(MONGOOSE_URL);

    console.log(`Servidor iniciado na porta ${PORT}`);
});