import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: [true, "Username is required"],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		email: {
			type: String,
			unique: true,
		},

		contributions: {
			type: Number,
			default: 0,
		},
		reviews: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

module.exports = models.User || model("User", userSchema);
