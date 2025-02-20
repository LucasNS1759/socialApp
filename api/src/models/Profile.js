const {DataTypes} = require("sequelize");

module.exports = (sequelize) =>{
 const Profile = sequelize.define("profile",{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name :{
       type: DataTypes.STRING,
       allowNull: false,
       
       
      },
      surName:{
        type: DataTypes.STRING,
        allowNull: false,
      
        
       },
   
      bio :{
       type: DataTypes.TEXT,
       allowNull: true,
      },
      profilePicture :{
       type: DataTypes.STRING,
       allowNull: true,
       defaultValue : "",
      },
      photoAlbum :{
       type: DataTypes.ARRAY(DataTypes.STRING),
       allowNull: true,
      },
      gender : {
       type : DataTypes.ENUM("male", "female"),
       allowNull : false,
      }
      
 })
 
 return Profile;
}