const errorHandler = (err, req, res, next) => {

    const statusCode = err.statusCode || 500;
    const message = err.message || "error occurred while processing request"

    // Si es un error inesperado (500), imprimimos más información para debug
    if (statusCode === 500) {
        console.error("internal server error:", err.stack || err);
    }

    res.status(statusCode).json({ error: message, status: statusCode });
}


module.exports = errorHandler