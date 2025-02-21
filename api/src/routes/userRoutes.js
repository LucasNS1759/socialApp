const { Router } = require("express");
const { createNewUserHandler } = require("../handlers/userHandlers");
const isLogued = require("../middleware/isLogued");
const { localLogin, localLogout } = require("../controllers/user/authController");
const checkIfBlocked = require("../middleware/checkIfBlocked ");


const userRoutes = Router();

userRoutes.post("/singUp", createNewUserHandler)
userRoutes.post("/login",  checkIfBlocked, localLogin);
userRoutes.post("/logout", localLogout);
userRoutes.get("/restartPassword");
userRoutes.get("/checkLogin",isLogued);

module.exports = userRoutes;