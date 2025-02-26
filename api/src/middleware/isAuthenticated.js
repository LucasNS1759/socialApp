const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
   
    
      // Si está autenticado, continúa con la ruta
       next(); 
    } else {

      return res.status(401).json({
          success: false,
          text: "Your session has expired, log in again ",
          type: "error",
          title: "Unauthorized"
      });
  }
};

  module.exports = isAuthenticated;