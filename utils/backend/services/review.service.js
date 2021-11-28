import { connectDb } from "../../backend/db";
import Review from "../../../models/review.model";

connectDb();

export const createReview = (review) => {
	return new Promise((resolve, reject) => {
		new Review(review)
			.save()
			.then((review) => {
				resolve(review);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
