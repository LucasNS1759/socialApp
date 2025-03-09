const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const Comment = sequelize.define("comment", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        multimedia: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        }

    })
    return Comment
}