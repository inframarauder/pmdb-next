import { createReview } from "../../../utils/backend/services/review.service";
import { getUser } from "../../../utils/backend/services/user.service";
import errorHandler from "../../../utils/backend/errorHandler";
import checkAuth from "../../../utils/backend/checkAuth";
import { BadRequest } from "../../../utils/backend/errors";

const handler = async (req, res) => {
	const { method } = req;
	switch (method) {
		case "POST":
			try {
				const query = { _id: req.user._id };
				const projection = ["reviewedTitles"];
				const user = await getUser(query, projection);
				if (user.reviewedTitles.includes(req.body.title)) {
					throw new BadRequest("You have already reviewed this title!");
				}
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
