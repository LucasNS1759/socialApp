const { User } = require("../../db.js")

const getMyProfileController = async (id) => {
    const user = await User.findByPk(id)
    
    const userProfile = await user.getProfile();
    if(!userProfile){
     throw new Error("Profile not found")
    }

    return userProfile.toJSON();

}



module.exports = getMyProfileController