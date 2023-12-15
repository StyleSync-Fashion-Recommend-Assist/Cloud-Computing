const { Model } = require("sequelize");

function createResPassDb (sequelize, DataTypes) {
  const ResPassword = sequelize.define('ResPassword', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: 'id',
      },
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    }, 
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
  }, 
  {
    tableName: "ResPassword",
  });
  return ResPassword;
}

module.exports = createResPassDb;