import mongoose from "mongoose";

const connectDB = async() => {

    mongoose.connection.on('connected', () => console.log("Database connected"));

    // Add error handling for missing or invalid MONGO_URI
    if (!process.env.MONGO_URI) {
        console.error("MONGO_URI environment variable is not defined");
        return;
    }

    try {
        await mongoose.connect(`${process.env.MONGO_URI}/mediconnect`);
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
}

export default connectDB;