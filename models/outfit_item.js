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
        allowNull: true,
      },
      // TODO: TAMBAHKAN KATEGORI ID DAN SUBKATEGORI DI MIGRATIONS
      kategoriId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Kategori',
          key: 'id',
        },
        allowNull: true,
      },
      subKategoriId:{
        type: DataTypes.INTEGER,
        references: {
          model: 'SubKategori',
          key: 'id',
        },
        allowNull: true,
      },
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: true,
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