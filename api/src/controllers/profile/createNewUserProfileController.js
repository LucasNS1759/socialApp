const { User, Profile } = require("../../db.js")

const createNewUserProfileController = async (id, nickName, bio, profilePicture, gender) => {

    const user = await User.findByPk(id)
    const newProfile = await user.createProfile({ nickName, bio, profilePicture, gender })

    

    return newProfile

}


module.exports = createNewUserProfileController