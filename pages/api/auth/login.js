import bcrypt from "bcryptjs";
import { getUser } from "../../../utils/backend/services/user.service";
import errorHandler from "../../../utils/backend/errorHandler";
import {
	BadRequest,
	NotFound,
	Unauthorized,
} from "../../../utils/backend/errors";

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			let { username, password } = req.body;
			if (!username || !password) {
				throw new BadRequest("Username or password is missing");
			}

			const query = { username };
			const projection = ["username", "password", "isAdmin"];
			let user = await getUser(query, projection);

			if (!user) {
				throw new NotFound("User not found");
			} else {
				const valid = await bcrypt.compare(password, user.password);
				if (!valid) {
					throw new Unauthorized("Invalid username or password");
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
			}
		} catch (error) {
			errorHandler(error, req, res);
		}
	} else {
		return res.status(405).json({ message: "Method not allowed" });
	}
}
