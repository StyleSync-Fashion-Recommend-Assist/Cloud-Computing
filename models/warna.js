function createWarnaDb (sequelize, DataTypes) {
  const Warna = sequelize.define('Warna', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false
      }
  }, 
  {
      tableName: "Warna",
  });

  return Warna;
}

module.exports = createWarnaDb;
