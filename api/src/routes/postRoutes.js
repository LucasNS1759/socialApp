const { Router } = require("express");
const { getAllPostsHandler,  createNewPostHandler, uploadMultimediaHandler, getThreadPostsHandler } = require("../handlers/postHandlers");
const isAuthenticated = require("../middleware/isAuthenticated");

const upload = require("../config/multerConfig");

const postRoutes = Router();

postRoutes.get("/all", getAllPostsHandler);
postRoutes.get("/thread/:id", getThreadPostsHandler);
postRoutes.post("/", isAuthenticated,createNewPostHandler);
postRoutes.post("/uploadMultimedia",upload.single("file"), uploadMultimediaHandler);
postRoutes.delete("/");

module.exports = postRoutes