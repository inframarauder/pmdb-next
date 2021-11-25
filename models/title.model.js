import { Schema, model } from "mongoose";

const titleSchema = new Schema(
	{
		type: {
			type: String,
			required: [true, "Title type is required"],
			enum: ["movie", "series", "anime"],
		},
		name: {
			type: String,
			required: [true, "Title name is required"],
		},
		poster: {
			type: String,
			required: [true, "Title poster is required"],
		},
		trailerLink: {
			type: String,
			required: [true, "Title trailerLink is required"],
		},
		year: {
			type: Number,
			required: [true, "Title year is required"],
		},
		genres: {
			type: String,
			required: [true, "Title genres is required"],
		},
		cast: {
			type: String,
			required: [true, "Title cast is required"],
		},
		directedBy: {
			type: String,
			required: [true, "Title directedBy is required"],
		},
		writtenBy: {
			type: String,
			required: [true, "Title writtenBy is required"],
		},
		runtime: {
			type: Number,
			required: [true, "Title runtime is required"],
		},
		language: {
			type: String,
			required: [true, "Title language is required"],
		},
		plot: {
			type: String,
			minlength: [10, "Plot must be atleast 10 characters long"],
			maxlength: [500, "Plot must be atmost 500 characters long"],
		},
		reviewCount: {
			type: Number,
			default: 0,
		},
		rating: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

module.exports = model("Title", titleSchema);
