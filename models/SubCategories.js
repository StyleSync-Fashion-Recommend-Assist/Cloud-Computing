function createSubCategoriesDb (sequelize, DataTypes) {
    const SubCategories = sequelize.define('SubCategories', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        kategoriId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Categories',
            key: 'id',
          },
          allowNull: false,
        },
        namaKategori: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "SubCategories"
      });

      return SubCategories;
}

module.exports = createSubCategoriesDb;