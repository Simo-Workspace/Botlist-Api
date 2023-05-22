import { Schema, model } from "mongoose";
import type { BotStructure } from "../typings";
import { MAIN_MODEL_NAME } from "../../.config.json";

const BotSchema = new Schema<BotStructure>({
    _id: String,
    name: String,
    avatar: String,
    botInviteURL: String,
    websiteURL: String,
    supportServer: String,
    sourceCode: String,
    description: String,
    longDescription: String,
    prefix: Array<string>,
    owners: Array<string>,
    creationTimestamp: Number,
    verifiedBot: Boolean,
    tags: Array<string>,
    approved: Boolean
});

export default model(MAIN_MODEL_NAME, BotSchema);