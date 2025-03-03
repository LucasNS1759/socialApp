const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env

cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
})

const uploadToCloudinary = async (file) => {
    return await cloudinary.uploader.upload(file, { resource_type: "auto" })
}

module.exports = { uploadToCloudinary }