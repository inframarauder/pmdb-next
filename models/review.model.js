import { model, models, Schema } from "mongoose";

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
			max: [10, "Rating must be atmost 10"],
		},
		caption: {
			type: String,
			required: [true, "Caption is required"],
			minlength: [1, "Caption must be atleast 1 character"],
			maxlength: [50, "Caption must be atmost 50 characters"],
		},
		review: {
			type: String,
			required: [true, "Review is required"],
			minlength: [10, "Review must be atleast 10 characters"],
			maxlength: [500, "Review must be atmost 500 characters"],
		},
	},
	{ timestamps: true }
);

module.exports = models.Review || model("Review", reviewSchema);
