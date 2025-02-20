const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("./routes");
require("./config/passport.config.")
const passport = require("passport");
require("dotenv").config();
const session = require("express-session")
const cookieParser = require("cookie-parser");
// const FileStore = require("session-file-store")(session);  //
//importaciones para hacer persistencia de sesion con la base de datos
const connectSessionSequelize = require("connect-session-sequelize")(session.Store);
const { sequelize } = require("./db.js");
const errorHandler = require("./middleware/errorCatching.js");
const AppError = require("./utils/appError.js");

const { SESSION_PASSWORD } = process.env;


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials :true,
  })
);

app.use(morgan("dev"));
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//configuracion de sesion
app.use(cookieParser());


// Definir el store de sesión
const sessionStore = new connectSessionSequelize({
  db: sequelize,  // La conexión de Sequelize
});

app.use(session({
  secret: SESSION_PASSWORD,
  resave: false,
  saveUninitialized: false,
  // store: new FileStore({ path: './sessions' }), 
  store: sessionStore,
  cookie: { httpOnly: true, secure: false, sameSite:"lax",maxAge: 24 * 60 * 60 * 1000 }  // 1 día
  
 // cookie: { httpOnly: true, secure: false, maxAge: 60 * 1000 } // 1 minuto en milisegundos

}));
// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());



app.use("/", routes)


//rutas inexistentes
app.use((req, res, next) => {
  next(new AppError("route not found", 404))
});

// Error catching 
app.use(errorHandler)


module.exports = app;
