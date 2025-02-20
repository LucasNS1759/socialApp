const createNewUserProfileController = require("../controllers/profile/createNewUserProfileController");
const getMyProfileController = require("../controllers/profile/getMyProfileController");


const createNewProfileHandler = async (req, res, next) => {

   const { id } = req.user.dataValues
   const { nickName, bio, profilePicture, gender } = req.body

   try {
      const response = await createNewUserProfileController(id, nickName, bio, profilePicture, gender)
      res.status(200).json(response)
   } catch (error) {
      next(error);
   }
}

const getMyProfileHandler = async (req, res, next) => {
   const { id } = req.user.dataValues
  console.log("entre")
   try {
      const response = await getMyProfileController(id)

      res.status(200).json(response)

   } catch (error) {

      next(error);
   }
}

const getProfileByIdHandler = async (req, res, next) => { }

const searchProfileHandler = async (req, res, next) => { }

module.exports = {
   createNewProfileHandler,
   getMyProfileHandler,
   getProfileByIdHandler,
   searchProfileHandler
}