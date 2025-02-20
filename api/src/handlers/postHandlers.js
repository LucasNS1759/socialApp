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



module.exports = {
    createNewPostHandler,
    getAllPostsHandler,
    getUserPostsHandler
}