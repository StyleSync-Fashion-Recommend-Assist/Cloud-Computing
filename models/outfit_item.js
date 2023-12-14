function createOutfitItemDb (sequelize, DataTypes) {
  const OutfitItem = sequelize.define('OutfitItem', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      outfitId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Outfit',
          key: 'id',
        },
        allowNull: false,
      },
      namaItem: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "OutfitItem",
    });

    return OutfitItem;
}

module.exports = createOutfitItemDb;