const { Post, User, Comment } = require("../../db.js");
const AppError = require("../../utils/appError");

const createCommentOrReplyController = async (postId, parentId, userId, text, media) => {


    const user = await User.findByPk(userId);


    let newComment;

    if (parentId) {
        const parentComment = await Comment.findByPk(parentId);

        if (!parentComment) {
            throw new AppError("Parent comment not found", 404);
        }

        newComment = await parentComment.createReply({ userId, text, media, postId: parentComment.postId });
        await newComment.setUser(user)
        console.log(newComment);
        console.log(user);
    } else {
        const post = await Post.findByPk(postId);

        if (!post) {
            throw new AppError("Post not found", 404);
        }
        newComment = await post.createComment({ userId, text, media });
        await newComment.setUser(user)

        console.log(newComment.__proto__);
    }
    return { message: 'Comment created successfully', comment: newComment }

}


module.exports = createCommentOrReplyController