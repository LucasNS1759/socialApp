const { Post, User } = require("../../db.js")

const createNewPostController = async (id, media, content) => {
   const user = await User.findByPk(id)
   const newPost = await user.createPost({media, content})
   return newPost
}

module.exports = createNewPostController