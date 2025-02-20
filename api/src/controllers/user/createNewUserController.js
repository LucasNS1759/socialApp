const { User } = require("../../db.js");
const AppError = require("../../utils/appError.js");


const createNewUserController = async (email, password, name, surName, gender) => {
      try {
            // si ya existe mandar error
            const existingUser = await User.findOne({ where: { email } })
            if (existingUser) {

                  throw new AppError(`User ${existingUser.email} already exists`)
            }
            // si no existe lo creamos 
            const newUser = await User.create({ email: email, password: password, name: name, surName: surName });
            //le creamos y asociamos un perfil a ese nuevo user 
            await newUser.createProfile({ name, surName, gender });

            //retornamos mensaje de exito si todo sale bien
            return { success: true, text: "User created successfully", type: "success", title: "successfully registered" };
      } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                  throw new AppError(error.errors.map((e) => e.message))
            }

            if (error.name === 'SequelizeValidationError') {
                  throw new AppError(error.errors.map((e) => e.message))
            }

            throw new AppError(error, 500);
      }
}


module.exports = createNewUserController

