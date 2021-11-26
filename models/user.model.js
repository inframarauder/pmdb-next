import { model, models, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Token from "./token.model";

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
		isAdmin: {
			type: Boolean,
			default: false,
		},
		contributions: {
			type: Number,
			default: 0,
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

userSchema.methods.createAccessToken = function () {
	try {
		const { ACCESS_TOKEN_SECRET } = process.env;
		const user = this.toObject();
		delete user.password;
		return jwt.sign({ user }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
	} catch (error) {
		console.error("Error in access token generation\n", error);
	}
};

userSchema.methods.createRefreshToken = async function () {
	try {
		const { REFRESH_TOKEN_SECRET } = process.env;
		const token = jwt.sign({ _id: this._id }, REFRESH_TOKEN_SECRET, {
			expiresIn: "365d",
		});
		await Token.create({ token });
		return token;
	} catch (error) {
		console.error("Error in refresh token generation\n", error);
	}
};

userSchema.pre("save", async function (next) {
	try {
		if (
			(this.isNew || this.isModified("password")) &&
			this.authType === "plain"
		) {
			const salt = await bcrypt.genSalt(12);
			this.password = await bcrypt.hash(this.password, salt);
		}

		return next();
	} catch (error) {
		console.error("Error in password hashing\n", error);
	}
});

module.exports = models.User || model("User", userSchema);
