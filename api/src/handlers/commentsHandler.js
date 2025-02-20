const createCommentOrReplyController = require("../controllers/comments/createCommentOrReplyController");



const postNewCommentHandler = async (req, res, next) => {
    const { postId, parentId, content, media } = req.body;
    const userId = req.user.dataValues.id
    console.log(userId);
    try {
        const response = await createCommentOrReplyController(
        postId, parentId, userId, content, media)
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}



module.exports = {
    postNewCommentHandler
}