import {
	getUserWatchlist,
	addToWatchlist,
} from "../../../utils/backend/services/user.service";
import errorHandler from "../../../utils/backend/errorHandler";
import checkAuth from "../../../utils/backend/checkAuth";
import { BadRequest } from "../../../utils/backend/errors";

const handler = async (req, res) => {
	const { method } = req;
	switch (method) {
		case "GET":
			try {
				const watchlist = await getUserWatchlist(req.user._id);
				return res.status(200).json({ watchlist });
			} catch (error) {
				errorHandler(error, req, res);
			}

			break;
		case "PUT":
			try {
				const { titleId } = req.body;
				if (!titleId) {
					throw new BadRequest("Missing titleId");
				}
				await addToWatchlist(req.user._id, titleId);
			} catch (error) {
				errorHandler(error, req, res);
			}
			break;
		case "DELETE":
			try {
				const { titleId } = req.body;
				if (!titleId) {
					throw new BadRequest("Missing titleId");
				}
				await removeFromWatchlist(req.user._id, titleId);
			} catch (error) {
				errorHandler(error, req, res);
			}
		default:
			return res.status(405).json({ message: "Method not allowed" });
	}
};

export default async function handlerWithAuth(req, res) {
	return checkAuth(req, res, handler);
}
