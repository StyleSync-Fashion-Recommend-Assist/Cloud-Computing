'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Closet', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
        allowNull: false,
      },
      kategoriId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Kategori',
          key: 'id',
        },
        allowNull: false,
      },
      subKategoriId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'SubKategori',
          key: 'id',
        },
        allowNull: false,
      },
      warnaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Warna',
          key: 'id',
        },
        allowNull: false,
      },
      occupationId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Occupation',
          key: 'id',
        },
      },
      dominanWarna: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.ENUM('Male', 'Female', 'Unisex'),
        allowNull: false,
      },
      size: {
        type: Sequelize.ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL'),
        allowNull: false,
      },
      isFavorite: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Closet');
  }
};