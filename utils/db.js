import mongoose from "mongoose";

export const connectDb = async () => {
	try {
		const db = await mongoose.connect(process.env.DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`MongoDB connected: ${db.connection.host}`);
	} catch (error) {
		console.log("Error in DB connection", error);
	}
};
