'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      uuid: { 
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          unique: true,
      },
      token: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      name: {
          type: Sequelize.STRING,
          allowNull: false
      },
      email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
              isEmail: true
          },
      },
      password: {
          type: Sequelize.STRING,
          allowNull: false
      },
      gender: Sequelize.ENUM('male', 'female', 'unisex'),
      height: Sequelize.DOUBLE,
      weight: Sequelize.DOUBLE,
      photoProfile :Sequelize.BLOB,
      createdAt: {
          type: Sequelize.DATE,
          allowNull: false
      }, 
      updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  }
};