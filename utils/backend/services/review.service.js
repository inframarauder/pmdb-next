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

export const getReviews = (titleId) => {
	return new Promise((resolve, reject) => {
		Review.find({ title: titleId })
			.populate({ path: "user", select: ["username"] })
			.sort({ rating: -1 })
			.then((reviews) => {
				resolve(reviews);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
