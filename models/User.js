function createUserDb (sequelize, DataTypes) {
  const User = sequelize.define('User', 
  {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
      },
      uuid: { // Token digunakan sebagai unique value untuk user, jika ingin logout token ini akan dihapus dari database
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          unique: true,
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
              isEmail: true
          },
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false
      },
      gender: DataTypes.ENUM('male', 'female', 'unisex'),
      height: DataTypes.DOUBLE,
      weight: DataTypes.DOUBLE,
      photoProfile :DataTypes.BLOB,
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
      tableName: "User",
  });

  return User;    
}

// export module
module.exports = createUserDb;