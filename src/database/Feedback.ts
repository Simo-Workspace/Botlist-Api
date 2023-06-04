import { Schema, model } from "mongoose";
import { MODELS_NAME } from "../../constants.json";
import { FeedbackStructure } from "../types/types";

const FeedbackSchema = new Schema<FeedbackStructure>({
    author: String,
    stars: Number,
    postedAt: String,
    content: String,
    targetBot: String
});

export default model(MODELS_NAME.Feedbacks, FeedbackSchema);