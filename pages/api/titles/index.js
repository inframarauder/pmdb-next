import { createTitle } from "../../../services/title.service";
import errorHandler from "../../../utils/errorHandler";

export default async function handler(req, res) {
	const { method } = req;
	switch (method) {
		case "POST":
			try {
				const title = await createTitle(req.body);
				return res
					.status(201)
					.json({ message: `Title ${title.name} created!` });
			} catch (error) {
				errorHandler(error, req, res);
			}
		default:
			return res.status(405).json({ message: "Method not allowed" });
	}
}
