'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OutfitItem', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      outfitId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Outfit',
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
        allowNull: true,
      },
      subKategoriId:{
        type: Sequelize.INTEGER,
        references: {
          model: 'SubKategori',
          key: 'id',
        },
        allowNull: true,
      },
      itemId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      namaItem: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      occupation: Sequelize.STRING,
      photoImage: Sequelize.STRING,
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
    await queryInterface.dropTable('OutfitItem');
  }
};