import { GeneralError } from "./errors";
import { Error } from "mongoose";

module.exports = (err, req, res) => {
	if (err instanceof GeneralError) {
		const code = err.getCode();
		return res.status(code).json({ error: err.message });
	} else if (err instanceof Error.ValidationError) {
		const { errors } = err;
		const errorKeys = Object.keys(errors);
		return res.status(400).json({
			error: errors[errorKeys[0]].properties.message,
		});
	} else {
		console.error(`Error in ${req.method} ${req.originalUrl}\n`, err);
		return res.status(500).json({ error: "Internal Server Error!" });
	}
};
