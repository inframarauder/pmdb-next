import { connectDb } from "../db";
import User from "../../../models/user.model";

connectDb();

export const getUser = (query, projection = []) => {
	return new Promise((resolve, reject) => {
		User.findOne(query, projection)
			.then((user) => {
				resolve(user);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const createUser = (user) => {
	return new Promise((resolve, reject) => {
		User.create(user)
			.then((user) => {
				resolve(user);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
