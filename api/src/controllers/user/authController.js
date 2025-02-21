const passport = require('passport');

const localLogin = (req, res, next) => {

  passport.authenticate("local", (err, user, info) => {
    if (err) {

      //si hay error lo paso al capturador de errores global
      next(err)

    }

    if (!user) {
      return res.status(401).json({ error: info.message })
    }

    req.login(user, (loginErr) => {
      if (loginErr) {
        return res.status(500).json({ error: "Error al iniciar sesión" });
      }



      //FORMATO PARA RECIBIR ALERTAS EN EL FRONT END TITLE TYPE (BASADO EN SWEETALERT) TEXT (MENSAJE PARA MOSTRAR )
      "success", "Welcome!"
      return res.json({
        text: "You are now logged in",
        type: "success",
        title: "Welcome!",
        success: true

      });
    });
  })(req, res, next);
};

const localLogout = (req, res, next) => {
  // controlo que no se pueda desloguear alguien quien no esta logueado ya sea por algun bug o porque expiro la sesion por ej por eso hago la comprobacion por afuera del logout
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "user not authenticated" })
  }
  req.logout((err) => {
    //si tengo un error lo paso al controlador global 
    if (err) {
      next(err);
    }
    //si todo esta bien respondo exitosamente passport se encarga de la sesion y la cierra y quita las credenciales asi que no necesito nada mas 
    //DEBERIA DE REDIRIGIR AL LOGIN DEL FRONT PARA QUE VUELVA A COMPLETAR EL FORMULARIO PORQUE CERRO SESION 
    return res.status(200).json({ message: "Session closed successfully", success: true });
  });
};

module.exports = { localLogin, localLogout };