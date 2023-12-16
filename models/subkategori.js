function createSubKategoriDb (sequelize, DataTypes) {
  const SubKategori = sequelize.define('SubKategori', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      kategoriId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Kategori',
          key: 'id',
        },
        allowNull: true,
      },
      namaKategori: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "SubKategori"
    });

    return SubKategori;
}

module.exports = createSubKategoriDb;