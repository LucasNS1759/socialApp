const { Router } = require("express");
const { getAllPostsHandler, getUserPostsHandler, createNewPostHandler, uploadMultimediaHandler } = require("../handlers/postHandlers");
const isAuthenticated = require("../middleware/isAuthenticated");
const isLogued = require("../middleware/isLogued");
const upload = require("../config/multerConfig");

const postRoutes = Router();

postRoutes.get("/user", getUserPostsHandler);
postRoutes.get("/all", getAllPostsHandler);
postRoutes.post("/", isAuthenticated,createNewPostHandler);
postRoutes.post("/", isAuthenticated,createNewPostHandler);
postRoutes.post("/uploadMultimedia",upload.single("file"), uploadMultimediaHandler);
postRoutes.delete("/");

module.exports = postRoutes