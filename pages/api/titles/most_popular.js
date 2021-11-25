import { connectDb } from "../../../utils/db";
import Title from "../../../models/title.model";

connectDb();

export default async function handler(req, res) {
	const { method } = req;
	switch (method) {
		case "GET":
			const titles = await Title.find({}).sort({ rating: -1 }).limit(10).lean();
			res.status(200).json({ titles });
			break;
		default:
			res.status(405).json({
				status: "error",
				message: "Method not allowed",
			});
			break;
	}
}
