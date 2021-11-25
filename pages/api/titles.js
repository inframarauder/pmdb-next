import { connectDb } from "../../utils/db";

connectDb();

export default function handler(req, res) {
	res.status(200).json({ name: "John Doe" });
}
