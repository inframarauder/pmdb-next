import mongoose from "mongoose";

export const connectDb = async () => {
	try {
		if (mongoose.connection.readyState >= 1) {
			return mongoose.connection.db;
		} else {
			const db = await mongoose.connect(process.env.DB_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			console.log(`MongoDB connected: ${db.connection.host}`);
			return db;
		}
	} catch (error) {
		console.log("Error in DB connection", error);
	}
};
