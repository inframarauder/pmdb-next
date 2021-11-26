import { models, model, Schema } from "mongoose";

const tokenSchema = new Schema({
	token: { type: String },
});

module.exports = models.Token || model("Token", tokenSchema);
