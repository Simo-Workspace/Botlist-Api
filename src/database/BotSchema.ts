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
	inviteURL: {
		type: String, required: false, default: "https://discord.com/api/oauth2/authorize?client_id=${id}&permissions=2147483639&scope=bot%20applications.commands"
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
	prefix: Array<string>,
	owners: Array<string>,
	createdAt: {
		type: String, required: true
	},
	verifiedBot: Boolean,
	tags: Array<string>,
	approved: {
		type: Boolean, required: true
	}
});

export default model(MAIN_MODEL_NAME, BotSchema);