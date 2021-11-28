import { getUser } from "../../../utils/backend/services/user.service";
import errorHandler from "../../../utils/backend/errorHandler";
import checkAuth from "../../../utils/backend/checkAuth";
import { BadRequest } from "../../../utils/backend/errors";

const handler = async (req, res) => {
	if (req.method === "GET") {
		try {
			const { titleId } = req.query;
			if (!titleId) {
				throw new BadRequest("Title id is required");
			}
			const query = { _id: req.user._id };
			const projection = ["reviewedTitles"];
			const user = await getUser(query, projection);
			if (user.reviewedTitles.includes(titleId)) {
				return res.status(200).json({ alreadyReviewed: true });
			} else {
				return res.status(200).json({ alreadyReviewed: false });
			}
		} catch (error) {
			errorHandler(error, req, res);
		}
	} else {
		return res.status(405).json({ message: "Method not allowed" });
	}
};

export default function handlerWithAuth(req, res) {
	return checkAuth(req, res, handler);
}
