const { Comment, User } = require("../../db.js");

const getRepliesPaginatedController = async (parentId, page, limit) => {
    const offset = (page - 1) * limit;

    const replies = await Comment.findAndCountAll({
        where: { parentId },
        // include: [{ model: User, attributes: ["id", "surName"] }],
        limit,
        offset,
    });
    console.log(replies)
    return {
        totalReplies: replies.count,
        totalPages: Math.ceil(replies.count / limit),
        currentPage: page,
        replies: replies.rows
    };
};
module.exports = getRepliesPaginatedController