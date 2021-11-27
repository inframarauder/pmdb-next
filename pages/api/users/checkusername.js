import { getUser } from "../../../utils/backend/services/user.service";
import errorHandler from "../../../utils/backend/errorHandler";

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const query = { username: req.body.username };
			const projection = ["_id", "username"];
			const user = await getUser(query, projection);

			return res.status(200).json({ available: !user });
		} catch (error) {
			errorHandler(error, req, res);
		}
	} else {
		return res.status(405).json({ message: "Method not allowed" });
	}
}
