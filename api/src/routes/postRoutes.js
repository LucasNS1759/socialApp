const { Router } = require("express");
const { getAllPostsHandler, getUserPostsHandler, createNewPostHandler } = require("../handlers/postHandlers");
const isAuthenticated = require("../middleware/isAuthenticated");

const postRoutes = Router();

postRoutes.get("/user", getUserPostsHandler);
postRoutes.get("/all", getAllPostsHandler);
postRoutes.post("/", isAuthenticated,createNewPostHandler);
postRoutes.put("/");
postRoutes.delete("/");

module.exports = postRoutes