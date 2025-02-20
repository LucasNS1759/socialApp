const { User } = require("../db.js");
const AppError = require("../utils/appError.js");

const checkIfBlocked = async (req, res, next) => {
    try {
        const { email } = req.body

        if (!email) {
            throw new AppError("Email is required", 404)
        }

        const user = await User.findOne({ where: { email } })

        if (!user) {
            throw new AppError("user not found", 404)
        }

        // Verificar si el usuario está bloqueado
        if (user.isBlocked) {
            const currentTime = new Date();
            const blockUntil = new Date(user.lastAttempt);

            // Si el tiempo de bloqueo ha expirado, desbloquear al usuario
            if (currentTime >= blockUntil) {
                await user.update({ isBlocked: false, lastAttempt: null, failedAttempts: 0 });
                return next(); // Permitir continuar
            }

            // Calculamos la diferencia en milisegundos y la convertimos a minutos
            const diffInMinutes = Math.ceil((blockUntil - currentTime) / (1000 * 60));

            throw new AppError(`User is blocked until ${diffInMinutes} minutes.`, 403)
        }

        next(); // Usuario no está bloqueado, continuar
    } catch (error) {
        next(error)
    }
}


module.exports = checkIfBlocked 