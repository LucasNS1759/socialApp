const {  User, Comment } = require("../../db.js");


const getCommentsPaginatedController = async (page, limit, postId) => {

    const offset = (page - 1) * limit

    const comments = await Comment.findAndCountAll({
        where: { postId, parentId: null },//solo  comentarios del post sin respuestas 
        include: [{ model: User, attributes: ["id", "surName"] }],
        order: [["createdAt", "DESC"]], // Más nuevos primero
        limit,
        offset,

    })
    return {
        totalComments: comments.count,
        totalPages: Math.ceil(comments.count / limit),
        currentPage: page,
        comments: comments.rows
    };

}


module.exports = getCommentsPaginatedController
