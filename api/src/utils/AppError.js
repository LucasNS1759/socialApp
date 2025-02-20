class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode || 500; // Código de estado por defecto
      this.isOperational = true; // Esto puede ayudarte a distinguir entre errores programáticos y de desarrollo
      Error.captureStackTrace(this, this.constructor); // Esto asegura que el stack trace sea más limpio
    
    }
    
  }
  
  module.exports = AppError;