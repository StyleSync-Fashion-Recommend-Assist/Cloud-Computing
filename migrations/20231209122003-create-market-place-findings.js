'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MarketPlaceFindings', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
            model: "User",
            key: 'id',
        },
        allowNull: false,
      },
      productImage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      productName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      productPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      marketplaceOrigin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      productLink: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('MarketPlaceFindings');
  }
};