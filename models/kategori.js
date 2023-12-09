function createKategoriDb (sequelize, DataTypes) {
  const Kategori = sequelize.define('Kategori', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      namaKategori: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Kategori",
    });

    return Kategori;
}

module.exports = createKategoriDb;