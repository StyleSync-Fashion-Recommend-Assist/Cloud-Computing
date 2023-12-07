function createCategoriesDb (sequelize, DataTypes) {
    const Categories = sequelize.define('Categories', {
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

module.exports = createCategoriesDb;