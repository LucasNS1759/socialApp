const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Friendship = sequelize.define("friendship", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
        },

        friendId: {
            type: DataTypes.UUID,
        },
        status: {
         type : DataTypes.ENUM("Pending", "Acepted", "Rejected")
        }


    })

    return Friendship
}