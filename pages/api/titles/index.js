import { connectDb } from "../../../utils/db";
import Title from "../../../models/title.model";
import errorHandler from "../../../utils/errorHandler";

connectDb();

export default async function handler(req, res) {
	const { method } = req;
	switch (method) {
		case "POST":
			try {
				await new Title(req.body).save();
				return res.status(201).json({ message: "Title added!" });
			} catch (error) {
				errorHandler(error, req, res);
			}
		default:
			return res.status(405).json({ message: "Method not allowed" });
	}
}
