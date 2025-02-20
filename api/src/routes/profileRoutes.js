const { Router } = require("express");
const verifyProfile = require("../middleware/verifyProfile");
const isAuthenticated = require("../middleware/isAuthenticated");
const { createNewProfileHandler, getMyProfileHandler, getProfileByIdHandler, searchProfileHandler } = require("../handlers/profileHandlers");


const profileRoutes = Router();

profileRoutes.post("/create", verifyProfile, createNewProfileHandler)
profileRoutes.put("/upDate")
profileRoutes.get("/me", isAuthenticated, getMyProfileHandler)
profileRoutes.get("/:id", isAuthenticated, getProfileByIdHandler)
profileRoutes.get("/search", isAuthenticated, searchProfileHandler)
profileRoutes.delete("/")


module.exports = profileRoutes;