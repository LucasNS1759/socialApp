const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log(req.isAuthenticated());
    
      // Si está autenticado, continúa con la ruta
       next(); 
    } else {
      console.log(req.isAuthenticated());
      // Si no está autenticado, redirige al login
      return res.status(400).json({message:"redirigiendo al login no esta logueado"})
    }
  };
  
  module.exports = isAuthenticated;