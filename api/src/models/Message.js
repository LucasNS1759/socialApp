const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const Message = sequelize.define("message", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        media: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        senderId: {
            type: DataTypes.UUID,
        },
        receiverId: {
            type: DataTypes.UUID
        }
    })
    return Message
}