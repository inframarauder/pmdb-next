import mongoose from "mongoose";

export const connectDb = async () => {
	try {
		mongoose.connect(process.env.DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`MongoDB connected: ${db.connection.host}`);

		return mongoose.connection.getClient();
	} catch (error) {
		console.log("Error in DB connection", error);
	}
};
