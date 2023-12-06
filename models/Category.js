function createCategoryDb (sequelize, DataTypes) {
    const Categories = sequelize.define('Kategori', {
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
        tableName: "Categories",
      });

      return Categories;
}

module.exports = createCategoryDb;