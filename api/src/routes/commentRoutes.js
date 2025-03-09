const {Router} = require("express");
const { postNewCommentHandler, getCommentsHandler, getRepliesHandler } = require("../handlers/commentsHandler");
const commentsRoutes = Router();


commentsRoutes.post("/",postNewCommentHandler)
commentsRoutes.delete("/:commentId")
commentsRoutes.put("/:commentId")
commentsRoutes.get("/:postId?",getCommentsHandler)
commentsRoutes.get("/replies/:parentId?",getRepliesHandler)
commentsRoutes.get("/:postCommentId")


module.exports = commentsRoutes;