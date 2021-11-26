import { createTitle, getTitles } from "../../../services/title.service";
import errorHandler from "../../../utils/errorHandler";
import checkAuth from "../../../utils/checkAuth";

const handler = async (req, res) => {
	const { method } = req;
	switch (method) {
		case "POST":
			try {
				const title = await createTitle(req.body);
				return res
					.status(201)
					.json({ message: `Title ${title.name} created!` });
			} catch (error) {
				errorHandler(error, req, res);
			}
			break;
		case "GET":
			try {
				const mongoQuery = {};
				const projection = [
					"name",
					"poster",
					"language",
					"year",
					"rating",
					"genres",
				];

				if (Object.keys(req.query).length > 0) {
					const { rating, searchText } = req.query;
					if (rating) {
						mongoQuery["rating"] = { $gte: parseInt(rating) };
					}
					if (searchText) {
						const regexQuery = { $regex: searchText, $options: "i" };
						mongoQuery["$or"] = [
							{ name: regexQuery },
							{ language: regexQuery },
							{ genres: regexQuery },
						];
					}
				}

				const titles = await getTitles(mongoQuery, projection);
				return res.status(200).json(titles);
			} catch (error) {
				errorHandler(error, req, res);
			}
		default:
			return res.status(405).json({ message: "Method not allowed" });
	}
};

export default function handlerWithAuth(req, res) {
	return checkAuth(req, res, handler, { admin: true });
}
