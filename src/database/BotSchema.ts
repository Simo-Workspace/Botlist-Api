import { Schema, model } from "mongoose";
import type { BotStructure } from "../typings";
import { MAIN_MODEL_NAME } from "../../constants.json";

const BotSchema = new Schema<BotStructure>({
    _id: {
        type: String, required: true
    },
    name: {
        type: String, required: true
    },
    avatar: String,
    inviteURL: String,
    websiteURL: String,
    supportServer: String,
    sourceCode: String,
    shortDescription: String,
    longDescription: String,
    prefix: Array<string>,
    owners: Array<string>,
    createdAt: String,
    verifiedBot: Boolean,
    tags: Array<string>,
    approved: Boolean
});

export default model(MAIN_MODEL_NAME, BotSchema);