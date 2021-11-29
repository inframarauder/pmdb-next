import errorHandler from "../../../utils/backend/errorHandler";
import checkAuth from "../../../utils/backend/checkAuth";
import { deleteTitle } from "../../../utils/backend/services/title.service";

const handler = async (req, res) => {
	const { method } = req;
	switch (method) {
		case "DELETE":
			try {
				const { titleId } = req.query;
				await deleteTitle({ _id: titleId });
				return res.status(200).json({ message: "Title deleted!" });
			} catch (error) {
				errorHandler(error, req, res);
			}
	}
};

export default function handlerWithAuth(req, res) {
	return checkAuth(req, res, handler, { admin: true });
}
