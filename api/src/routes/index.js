const {Router} = require("express")
const userRoutes = require("./userRoutes")
const postRoutes = require("./postRoutes")
const profileRoutes = require("./profileRoutes")
const commentsRoutes = require("./commentRoutes")

const routes = Router()

routes.use("/auth",userRoutes)
routes.use("/post",postRoutes)
routes.use("/profile",profileRoutes)
routes.use("/comments",commentsRoutes)


module.exports = routes