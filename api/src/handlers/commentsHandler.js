const createCommentOrReplyController = require("../controllers/comments/createCommentOrReplyController");
const getCommentsPaginatedController = require("../controllers/comments/getCommentsPaginatedController");
const getRepliesPaginatedController = require("../controllers/comments/getRepliesPaginatedController");



const postNewCommentHandler = async (req, res, next) => {
    const { postId, parentId, text, media } = req.body;
    const userId = req.user.dataValues.id
    console.log(userId);
    try {
        const response = await createCommentOrReplyController(
            postId, parentId, userId, text, media)
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const getCommentsHandler = async (req, res, next) => {
    const { postId } = req.params;
    const { page = 1, limit = 5 } = req.query;
    try {
        const response = await getCommentsPaginatedController(page, limit, postId);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const getRepliesHandler = async (req, res, next) => {
    const { parentId } = req.params;
    console.log(parentId);
    const { page = 1, limit = 5 } = req.query;
    try {
        const response = await getRepliesPaginatedController(parentId, page, limit);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}



module.exports = {
    postNewCommentHandler,
    getCommentsHandler,
    getRepliesHandler
}