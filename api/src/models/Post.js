const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const Post = sequelize.define("post", {
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
        },
        privacy: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        scheduler: {
            type: DataTypes.DATE,
            allowNull: true
        }



    })
    return Post
}