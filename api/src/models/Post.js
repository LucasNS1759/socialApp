const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const Post = sequelize.define("post", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        media: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
      
    

    })
    return Post
}