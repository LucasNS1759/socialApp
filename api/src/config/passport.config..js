const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../db.js");


passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },

        async (email, password, done) => {

            try {
                const user = await User.findOne({ where: { email } });
                if (!user) return done(null, false, { message: "User not found" });

                // Verificar contraseña
                const isValid = await user.validatePassword(password);
                if (!isValid) {
                    const failedAttempts = user.failedAttempts + 1;
                   
                    const blockUntil = new Date();
                    blockUntil.setMinutes(blockUntil.getMinutes() + 15); // Bloquear por 15 minutos
                    await user.update({
                        failedAttempts,
                        isBlocked: failedAttempts >= 10,
                        lastAttempt: blockUntil
                    })
                     await user.save();
                    return done(null, false, { message: "Invalid password" });
                }

                // Restablecer intentos fallidos tras un login exitoso
                await user.update({
                    failedAttempts: 0,
                    lastAttempt: null,
                    isBlocked : false
                });
                await user.save();
                return done(null, user)
            } catch (error) {
                return done(error)
            }

        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
});


module.exports = passport