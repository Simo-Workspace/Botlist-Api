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
	prefix: {
		type: [String], required: true
	},
	owners: {
		type: [String], required: true
	},
	createdAt: {
		type: String, required: true
	},
	verifiedBot: Boolean,
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

export default model(MODELS_NAME.Bots, BotSchema);