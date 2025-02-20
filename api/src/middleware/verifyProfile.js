const { User, Profile } = require("../db.js")

const verifyProfile = async (req, res, next) => {
    try {
         
        const {email} = req.body
      console.log(req.body)
        const profile = await User.findOne({ where: { email }, include: { model: Profile } })
         
         // si ya tiene un profile no puede acceder al formulario 
         //si no tiene uno que se cree uno 
        return profile && profile.profile
            ?
            res.status(402).json("this user has already a profile")
            :
            next()

    } catch (error) {
        next(error)
    }
}



module.exports = verifyProfile