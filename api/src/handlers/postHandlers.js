const { uploadToCloudinary } = require("../config/cloudinaryService");
const createNewPostController = require("../controllers/post/createNewPostController");
const getAllPostsController = require("../controllers/post/getAllPostsController");




const createNewPostHandler = async (req, res, next) => {
    const { media, content } = req.body;
    const { id } = req.user.dataValues
    console.log(content)
    try {
        const response = await createNewPostController(id, media, content)
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const getUserPostsHandler = async (req, res, next) => {
    try {

    } catch (error) {

        next(error);
    }
}

const getAllPostsHandler = async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const response = await getAllPostsController(page, limit)
        res.status(200).json(response)
    } catch (error) {

        next(error);
    }
}

const uploadMultimediaHandler = async (req, res, next) => {

    console.log("pase")
    const fileBuffer = req.file.buffer.toString("base64");

    try {
        const response = await uploadToCloudinary(`data:${req.file.mimetype};base64,${fileBuffer}`);
        res.status(200).json({ url: response.secure_url, public_id: response.public_id })
    } catch (error) {
        next(error)
    }
}



module.exports = {
    createNewPostHandler,
    getAllPostsHandler,
    getUserPostsHandler,
    uploadMultimediaHandler
}