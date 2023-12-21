'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Occupation', [
      {name: 'Hitam', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Putih', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Merah', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Kuning', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Hijau', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Biru', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Ungu', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Coklat', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Orange', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Abu-abu', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Pink', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Gold', createdAt: new Date(), updatedAt: new Date()},
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
