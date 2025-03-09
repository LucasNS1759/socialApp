const { Comment, User } = require("../../db.js");

const getRepliesPaginatedController = async (parentId, page, limit) => {
    const offset = (page - 1) * limit;

    const replies = Comment.findAndCountAll({
        where: { parentId:parentId },
        // include: [{ model: User, attributes: ["id", "surName"] }],
        limit,
        offset,
    });
    return {
        totalReplies: replies.count,
        totalPages: Math.ceil(replies.count / limit),
        currentPage: page,
        replies: replies.rows
    };
};
module.exports = getRepliesPaginatedController