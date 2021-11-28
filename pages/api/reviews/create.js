import { createReview } from "../../../utils/backend/services/review.service";
import errorHandler from "../../../utils/backend/errorHandler";
import checkAuth from "../../../utils/backend/checkAuth";

const handler = async (req, res) => {
	const { method } = req;
	switch (method) {
		case "POST":
			try {
				await createReview({ ...req.body, user: req.user._id });
				res.status(200).json({ message: "Review created!" });
			} catch (error) {
				errorHandler(error, req, res);
			}

			break;
		default:
			return res.status(405).json({ message: "Method not allowed" });
	}
};

export default function handlerWithAuth(req, res) {
	return checkAuth(req, res, handler);
}
