import { Schema, model } from "mongoose";
import { FeedbackStructure } from "../types/types";
import { MODELS_NAME } from "../../../constants.json";

const _FeedbackSchema = new Schema<FeedbackStructure>({
    author: {
        type: String, required: true
    },
    stars: {
        type: Number, required: true
    },
    postedAt: {
        type: String, required: true
    },
    content: {
        type: String, required: true, maxlength: 500
    },
    targetBot: {
        type: String, required: true
    }
});

export const FeedbackSchema = model(MODELS_NAME.Feedbacks, _FeedbackSchema);