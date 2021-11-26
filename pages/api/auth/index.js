import bcrypt from "bcryptjs";
import { connectDb } from "../../../utils/db";
import User from "../../../models/user.model";
import errorHandler from "../../../utils/errorHandler";
import { BadRequest, Unauthorized } from "../../../utils/errors";

connectDb();

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			let { username, password } = req.body;
			if (!username || !password) {
				throw new BadRequest("Username or password is missing");
			}
			let user = await User.findOne({ username }, [
				"username",
				"password",
				"isAdmin",
			]);
			if (!user) {
				const salt = await bcrypt.genSalt(12);
				password = await bcrypt.hash(password, salt);
				user = await new User({ username, password }).save();
			} else {
				const valid = await bcrypt.compare(password, user.password);
				if (!valid) {
					throw new Unauthorized("Invalid username or password");
				}
			}
			return res.status(201).json({
				message: "User authenticated successfully",
				token: user.generateAuthToken(),
				user: {
					_id: user._id,
					username: user.username,
					isAdmin: user.isAdmin,
				},
			});
		} catch (error) {
			errorHandler(error, req, res);
		}
	} else {
		return res.status(405).json({ message: "Method not allowed" });
	}
}
