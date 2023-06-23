import { Schema, model } from "mongoose";
import { MODELS_NAME } from "../../constants.json";
import type { UserStructure } from "../types/types";

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