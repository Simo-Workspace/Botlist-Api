import { Schema, model } from "mongoose";
import { MODELS_NAME } from "../../constants.json";
import type { BotStructure, VoteStructure } from "../typings";

const BotSchema = new Schema<BotStructure>({
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
	},
	votes: Array<VoteStructure>
});

export default model(MODELS_NAME.Bots, BotSchema);