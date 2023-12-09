'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Outfit', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
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
      namaOutfit: {
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
    await queryInterface.dropTable('Outfit');
  }
};