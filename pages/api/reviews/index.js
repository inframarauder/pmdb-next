import { getReviews } from "../../../utils/backend/services/review.service";
import errorHandler from "../../../utils/backend/errorHandler";
import { BadRequest } from "../../../utils/backend/errors";

export default async function (req, res) {
	if (req.method === "GET") {
		try {
			if (!req.query.titleId) {
				throw new BadRequest("Title id is required");
			}
			const reviews = await getReviews(req.query.titleId);
			res.status(200).json({ reviews });
		} catch (error) {
			errorHandler(error, req, res);
		}
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
