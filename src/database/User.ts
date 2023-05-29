import { Schema, model } from "mongoose";
import type { UserStructure } from "../typings";

const UserSchema = new Schema<UserStructure>({
	_id: String,
	username: String,
	avatar: String,
});

export default model("User", UserSchema);