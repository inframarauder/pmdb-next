import jwt from "jsonwebtoken";
import errorHandler from "../errorHandler";
import { Unauthorized, Forbidden } from "./errors";

export default function (req, res, handler, options = { admin: false }) {
	try {
		if (!req.headers.authorization) {
			throw new Unauthorized("No authorization header");
		}
		const token = req.headers.authorization.split(" ")[1];
		if (!token) {
			throw new Unauthorized("No token provided");
		}
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = payload.user;
		if (options.admin && !req.user.isAdmin) {
			throw new Forbidden("Admin access required");
		}
		return handler(req, res);
	} catch (error) {
		errorHandler(error, req, res);
	}
}
