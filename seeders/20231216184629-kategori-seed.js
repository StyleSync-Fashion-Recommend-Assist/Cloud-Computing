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
    await queryInterface.bulkInsert('Kategori', [
      {namaKategori: "Tops", createdAt: new Date(), updatedAt: new Date()},
      {namaKategori: "Dresses", createdAt: new Date(), updatedAt: new Date()},
      {namaKategori: "Bottoms", createdAt: new Date(), updatedAt: new Date()},
      {namaKategori: "Outerwear", createdAt: new Date(), updatedAt: new Date()},
      {namaKategori: "Activewear", createdAt: new Date(), updatedAt: new Date()},
      {namaKategori: "Shoes", createdAt: new Date(), updatedAt: new Date()},
      {namaKategori: "Accessories", createdAt: new Date(), updatedAt: new Date()},
      {namaKategori: "Swimwear", createdAt: new Date(), updatedAt: new Date()},
      {namaKategori: "Sleepwear", createdAt: new Date(), updatedAt: new Date()},
      {namaKategori: "Special Occasion", createdAt: new Date(), updatedAt: new Date()},
      {namaKategori: "Seasonal", createdAt: new Date(), updatedAt: new Date()},
      {namaKategori: "Workwear", createdAt: new Date(), updatedAt: new Date()},
      {namaKategori: "Ethnic Wear", createdAt: new Date(), updatedAt: new Date()},
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
