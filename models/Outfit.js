function createOutfitDb (sequelize, DataTypes){
    const Outfit = sequelize.define('Outfit', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Users',
            key: 'id',
          },
          allowNull: false,
        },
        occupationId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Occupation',
            key: 'id',
          },
        },
        namaOutfit: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isFavorite: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        tableName: "Outfit",
      });

      return Outfit;
}

module.exports = createOutfitDb;