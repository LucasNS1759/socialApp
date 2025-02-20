const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");


module.exports = (sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 40],
          msg: "name must be between 3 and 40 characters"
        },
        notEmpty: {
          msg: " name not be empty",
        },
      }
    },
    surName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 40],
          msg: " surName must be between 3 and 40 characters"
        },
        notEmpty: {
          msg: " surName not be empty",
        },
      }
    },
  
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'The email is already registered.' // Mensaje personalizado
      },
      validate: {
        isEmail: {
          args: true,
          msg: "It must be a valid email"// Valida que sea un email válido
        }
      },
      notNull : {
       msg: "the email cannot be empty" 
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 100], // Longitud mínima de 6 caracteres
          msg: "Password must be at least 6 characters long",
        },
        isValidPassword(value) {
          const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;
          if (!regex.test(value)) {
            throw new Error(
              "Password must contain at least one uppercase letter and one special character"
            );
          }
        },
      },
    },
    failedAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // inicia los intentos fallidos en 0
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    lastAttempt: {
      type: DataTypes.DATE, // fecha hasta que el usuario estara bloqueado
      allowNull: true,
    },

  },
    { timestamps: false });

  // Hook para encriptar la contraseña antes de guardar
  User.addHook("beforeCreate", async (user) => {
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  //hook para encriptar una nueva contraseña
  User.addHook("beforeUpdate", async (user) => {
    if (user.changed("password")) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  User.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };


  //elimino la contraseña  de la respuesta al momento de pedir informacion y enviarla como JSON para ocultar datos sensibles 
  //this.get() me devuelve el objeto completo le borro la contraseña a la instancia de objeto/copia  retorno el nuevo valor
  User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    return values;
  };

  return User;
};
