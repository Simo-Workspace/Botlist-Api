import { Schema, model } from "mongoose";
import { MODELS_NAME } from "../../../constants.json";
import type { BotStructure, VoteStructure } from "../types/types";

const _BotSchema = new Schema<BotStructure>({
    _id: {
        type: String, required: true
    },
    name: {
        type: String, required: true
    },
    avatar: {
        type: String, required: true
    },
    inviteURL: {
        type: String, required: true
    },
    websiteURL: String,
    supportServer: String,
    sourceCode: String,
    shortDescription: {
        type: String, required: true
    },
    longDescription: {
        type: String, required: true
    },
    prefix: {
        type: [String], required: true
    },
    owners: {
        type: [String], required: true
    },
    createdAt: {
        type: String, required: true
    },
    verifiedBot: {
        type: Boolean, required: true
    },
    tags: {
        type: [String], required: true
    },
    approved: {
        type: Boolean, required: true
    },
    votes: {
        type: [Object] as unknown as VoteStructure[], required: true, default: []
    }
});

export const BotSchema = model(MODELS_NAME.Bots, _BotSchema);