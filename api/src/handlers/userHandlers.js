const createNewUserController = require("../controllers/user/createNewUserController");
const createNewUserProfileController = require("../controllers/user/createNewUserProfileController");

const createNewUserHandler = async (req, res, next) => {
  const { email, password ,name, surName,gender } = req.body;
  try {
    const response = await createNewUserController(email, password,name, surName,gender);
    //deberia de rederigir al login
    res.status(200).json(response)
  } catch (error) {

    next(error);
  }
};

const createUserProfileHandler = async (req, res, next) => {
  try {
    const response = await createNewUserProfileController(req.body)
    return res.status(200).json({ success: true, profile: response });
  } catch (error) {
    next(error)
  }
}

const ruteProtected = async (req, res, next) => {
  try {
    res.status(200).json("accediendo a ruta protegida")
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createNewUserHandler,
  ruteProtected,
  createUserProfileHandler
};
