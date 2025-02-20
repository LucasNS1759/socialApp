require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// cuado el server se inicia esta instancia crea la conexion a la bdd 
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

const basename = path.basename(__filename);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { User } = sequelize.models
const { Post } = sequelize.models
const { Comment } = sequelize.models
const { Profile } = sequelize.models


//relaciones 

/****************************************************** */
//un usuario puede tener un profile
User.hasOne(Profile, { foreignKey: "UserId" })
//un profile pertenece a un user
Profile.belongsTo(User, { foreignKey: "UserId" })

/****************************************************** */

//un usuario puede crear muchos posts
User.hasMany(Post, { foreignKey: "UserId" })
//cada post pertenece a un usuario
Post.belongsTo(User, { foreignKey: "UserId" })
/****************************************************** */

//un usuario puede hacer muchos comentarios
User.hasMany(Comment, { foreignKey: "UserId" });
//cada comentario pertenece a un user 
Comment.belongsTo(User, { foreignKey: "UserId" });

/****************************************************** */

//un post puede tener muchos comentarios
Post.hasMany(Comment, { foreignKey: "postId" });
//cada comentario pertenece a un post 
Comment.belongsTo(Post, { foreignKey: "postId" });

/****************************************************** */
Comment.hasMany(Comment, { as: 'replies', foreignKey: 'parentId' });
Comment.belongsTo(Comment, { as: 'parent', foreignKey: 'parentId' });


module.exports = {
  ...sequelize.models,
  conection: sequelize,
  sequelize
};
