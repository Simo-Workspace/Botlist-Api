import { Schema, model } from "mongoose";
import type { UserStructure } from "../types/types";
import { MODELS_NAME } from "../../../constants.json";

const _UserSchema = new Schema<UserStructure>({
    _id: {
        type: String, required: true
    },
    username: {
        type: String, required: true
    },
    avatar: {
        type: String, required: true
    }
});

export const UserSchema = model(MODELS_NAME.Users, _UserSchema);