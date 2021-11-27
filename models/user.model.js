import { model, models, Schema } from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: [true, "Username is required"],
			index: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},

		isAdmin: {
			type: Boolean,
			default: false,
		},
		reviews: {
			type: Number,
			default: 0,
		},
		watchlist: {
			type: [Schema.Types.ObjectId],
			ref: "Title",
			default: [],
		},
	},
	{ timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
	try {
		const { JWT_SECRET } = process.env;
		const user = this.toObject();
		delete user.password;
		return jwt.sign({ user }, JWT_SECRET);
	} catch (error) {
		console.error("Error in access token generation\n", error);
	}
};

module.exports = models.User || model("User", userSchema);
