import { Schema, model } from "mongoose";
import type { UserStructure } from "../types/types";
import { MODELS_NAME } from "../../../constants.json";

const UserSchema = new Schema<UserStructure>({
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

export default model(MODELS_NAME.Users, UserSchema);