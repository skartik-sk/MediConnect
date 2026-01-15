import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
    // Check if Cloudinary credentials are available
    if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_SECRET_KEY) {
        console.warn("Cloudinary credentials not configured. Image uploads will be disabled.");
        return;
    }

    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret : process.env.CLOUDINARY_SECRET_KEY,
        });
        console.log("cloudinary connected");
    } catch (error) {
        console.error("Cloudinary configuration error:", error.message);
    }
}

export default connectCloudinary;