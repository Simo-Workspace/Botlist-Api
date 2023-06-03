import { Schema, model} from "mongoose";
import { GuildStructure } from "../typings";
import { MODELS_NAME } from "../../constants.json";

const GuildSchema = new Schema<GuildStructure>({
    _id: {
        type: String, required: true
    },
    verificationChannel: {
        type: String, required: true
    },
    logsChannel: {
        type: String, required: true
    },
    addbotChannel: String
});

export default model(MODELS_NAME.Guilds, GuildSchema);