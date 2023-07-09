import { Schema, model} from "mongoose";
import { GuildStructure } from "../types/types";
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
    addbotChannel: String,
    owners: {
        type: [String], required: true
    }
});

export default model(MODELS_NAME.Guilds, GuildSchema);