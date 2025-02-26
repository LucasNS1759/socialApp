const { Post, User } = require("../../db.js")

const createNewPostController = async (id, multimedia, text, privacy, scheduler) => {
   const user = await User.findByPk(id)
   const newPost = await user.createPost({ multimedia, text, privacy, scheduler })


   return newPost
}

module.exports = createNewPostController