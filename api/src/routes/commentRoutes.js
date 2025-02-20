const {Router} = require("express");
const { postNewCommentHandler } = require("../handlers/commentsHandler");
const commentsRoutes = Router();


commentsRoutes.post("/",postNewCommentHandler)
commentsRoutes.delete("/:commentId")
commentsRoutes.put("/:commentId")
commentsRoutes.get("/:commentId")


module.exports = commentsRoutes;