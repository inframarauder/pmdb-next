import { model, models, Schema } from "mongoose";
import Title from "./title.model";
import User from "./user.model";

const reviewSchema = new Schema(
	{
		title: {
			type: Schema.Types.ObjectId,
			ref: "Title",
			required: [true, "Title is required"],
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "User is required"],
		},
		rating: {
			type: Number,
			required: [true, "Rating is required"],
			min: [1, "Rating must be atleast 1 "],
			max: [50, "Rating must be atmost 50"],
		},
		caption: {
			type: String,
			required: [true, "Caption is required"],
			minlength: [1, "Caption must be atleast 1 character"],
			maxlength: [50, "Caption must be atmost 50 characters"],
		},
		description: {
			type: String,
			minlength: [10, "Review must be atleast 10 characters"],
		},
	},
	{ timestamps: true }
);

reviewSchema.post("save", async function (doc) {
	//update title's average rating
	const title = await Title.findById(doc.title);
	title.rating =
		(title.rating * title.reviewCount + doc.rating) / (title.reviewCount + 1);
	title.reviewCount += 1;
	await title.save();

	//update user's review count
	await User.findByIdAndUpdate(doc.user, { $inc: { reviews: 1 } });
});

module.exports = models.Review || model("Review", reviewSchema);
