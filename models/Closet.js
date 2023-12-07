function createClosetDb (sequelize, DataTypes){
    const Closet = sequelize.define('Closet', {
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
        kategoriId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Categories',
            key: 'id',
          },
          allowNull: false,
        },
        subKategoriId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'SubCategories',
            key: 'id',
          },
          allowNull: false,
        },
        warnaId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Colors',
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
        dominanWarna: {
          type: DataTypes.STRING,
        },
        gender: {
          type: DataTypes.ENUM('Male', 'Female', 'Unisex'),
          allowNull: false,
        },
        size: {
          type: DataTypes.ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL'),
          allowNull: false,
        },
        isFavorite: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        tableName: "Closet",
      });

      return Closet;
}

module.exports = createClosetDb;