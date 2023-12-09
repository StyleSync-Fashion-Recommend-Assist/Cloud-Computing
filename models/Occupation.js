function createOcuppationDb (sequelize, DataTypes) {
  const Occupation = sequelize.define('Occupation', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      occupationName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Occupation"
    });

    return Occupation;
}

module.exports = createOcuppationDb;