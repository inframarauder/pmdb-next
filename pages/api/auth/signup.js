import bcrypt from "bcryptjs";
import { getUser, createUser } from "../../../services/user.service";
import errorHandler from "../../../utils/errorHandler";
import { BadRequest } from "../../../utils/errors";

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
				const salt = await bcrypt.genSalt(12);
				password = await bcrypt.hash(password, salt);
				user = await createUser({ username, password });
				return res.status(201).json({
					message: "User authenticated successfully",
					token: user.generateAuthToken(),
					user: {
						_id: user._id,
						username: user.username,
						isAdmin: user.isAdmin,
					},
				});
			} else {
				throw new BadRequest("User already exists");
			}
		} catch (error) {
			errorHandler(error, req, res);
		}
	} else {
		return res.status(405).json({ message: "Method not allowed" });
	}
}
