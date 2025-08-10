const fs = require("fs");
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (filePath) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(filePath);

        // Remove local file after upload
        try {
            fs.unlinkSync(filePath);
        } catch (unlinkErr) {
            console.error("Failed to delete local file:", unlinkErr);
        }

        return uploadResult?.secure_url || null;

    } catch (err) {
        console.error("Cloudinary upload error:", err);

        // Try deleting local file even if upload fails
        try {
            fs.unlinkSync(filePath);
        } catch (unlinkErr) {
            console.error("Failed to delete local file after error:", unlinkErr);
        }

        return null; // Let the controller handle the response
    }
};

module.exports = uploadOnCloudinary;
