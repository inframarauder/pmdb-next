import { connectDb } from "../../../utils/db";
import Title from "../../../models/title.model";

connectDb();

export default async function handler(req, res) {
	const { method } = req;
	switch (method) {
		case "POST":
			try {
				await new Title(req.body).save();
				return res.status(201).json({ message: "Title added!" });
			} catch (error) {
				return res.status(500).json({ error: error.message });
			}
		default:
			return res.status(405).json({ message: "Method not allowed" });
	}
}
