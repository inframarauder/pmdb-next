import { connectDb } from "../utils/db";
import Title from "../models/title.model";

connectDb();

export const getTitles = (query, projection, sort = { _id: -1 }, limit = 0) => {
	if (limit > 0) {
		return new Promise((resolve, reject) => {
			Title.find(query, projection)
				.sort(sort)
				.limit(limit)
				.exec((err, titles) => {
					if (err) reject(err);
					resolve(titles);
				});
		});
	} else {
		return new Promise((resolve, reject) => {
			Title.find(query, projection)
				.sort(sort)
				.exec((err, titles) => {
					if (err) reject(err);
					resolve(titles);
				});
		});
	}
};

export const createTitle = (title) => {
	return new Promise((resolve, reject) => {
		const newTitle = new Title(title);
		newTitle.save((err, title) => {
			if (err) reject(err);
			resolve(title);
		});
	});
};

export const readTitle = (query, projection = []) => {
	return new Promise((resolve, reject) => {
		Title.findOne(query, projection, (err, title) => {
			if (err) reject(err);
			resolve(title);
		});
	});
};
