const { Post, User, Comment } = require("../../db.js");
const AppError = require("../../utils/appError");

const createCommentOrReplyController = async (postId, parentId, userId, content, media) => {

console.log(userId)
    const post = await Post.findByPk(postId);
    const user = await User.findByPk(userId);

    if (!post) {
        throw new AppError("Post not found", 404);
    }

    let newComment;

    if (parentId) {
        const parentComment = await Comment.findByPk(parentId);

        if (!parentComment) {
            throw new AppError("Parent comment not found", 404);
        }

        newComment = await parentComment.createReply({ userId, content, media,postId });
        await newComment.setUser(user)
    } else {

        newComment = await post.createComment({ userId, content, media });
        await newComment.setUser(user)
        
        console.log(newComment.__proto__);
    }
    return { message: 'Comment created successfully', comment: newComment }

}


module.exports = createCommentOrReplyController