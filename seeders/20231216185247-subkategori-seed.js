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
   await queryInterface.bulkInsert('SubKategori', [
     {kategoriId: 1, namaKategori: 'T-Shirt', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 1, namaKategori: 'Blouses', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 1, namaKategori: 'Shirts', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 1, namaKategori: 'Sweaters', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 1, namaKategori: 'Hoodies', createdAt: new Date(), updatedAt: new Date()},

     {kategoriId: 2, namaKategori: 'Casual Dresses', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 2, namaKategori: 'Formal Dresses', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 2, namaKategori: 'Maxi Dresses', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 2, namaKategori: 'Sundresses', createdAt: new Date(), updatedAt: new Date()},

     {kategoriId: 3, namaKategori: 'Jeans', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 3, namaKategori: 'Trousers', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 3, namaKategori: 'Skirts', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 3, namaKategori: 'Shorts', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 3, namaKategori: 'Leggings', createdAt: new Date(), updatedAt: new Date()},

     {kategoriId: 4, namaKategori: 'Jackets', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 4, namaKategori: 'Blazers', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 4, namaKategori: 'Coats', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 4, namaKategori: 'Cardigans', createdAt: new Date(), updatedAt: new Date()},

     {kategoriId: 5, namaKategori: 'Gym Tops', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 5, namaKategori: 'Workout Leggings', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 5, namaKategori: 'Sports Bras', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 5, namaKategori: 'Athletic Shorts', createdAt: new Date(), updatedAt: new Date()},

     {kategoriId: 6, namaKategori: 'Sneakers', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 6, namaKategori: 'Boots', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 6, namaKategori: 'Flats', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 6, namaKategori: 'Heels', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 6, namaKategori: 'Sandals', createdAt: new Date(), updatedAt: new Date()},

     {kategoriId: 7, namaKategori: 'Hats', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 7, namaKategori: 'Scarves', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 7, namaKategori: 'Gloves', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 7, namaKategori: 'Belts', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 7, namaKategori: 'Socks', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 7, namaKategori: 'Watches', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 7, namaKategori: 'Bracelets', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 7, namaKategori: 'Rings', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 7, namaKategori: 'Earrings', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 7, namaKategori: 'Necklaces', createdAt: new Date(), updatedAt: new Date()},

     {kategoriId: 8, namaKategori: 'Swimsuits', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 8, namaKategori: 'Cover-ups', createdAt: new Date(), updatedAt: new Date()},

     {kategoriId: 9, namaKategori: 'Pajamas', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 9, namaKategori: 'Nightgowns', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 9, namaKategori: 'Robes', createdAt: new Date(), updatedAt: new Date()},

     {kategoriId: 10, namaKategori: 'Formal Wear', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 10, namaKategori: 'Party Dresses', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 10, namaKategori: 'Fall Wardrobe', createdAt: new Date(), updatedAt: new Date()},

     {kategoriId: 11, namaKategori: 'SleSummer Wardrobeepwear', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 11, namaKategori: 'Winter Wardrobe', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 11, namaKategori: 'Spring Wardrobe', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 11, namaKategori: 'Bath', createdAt: new Date(), updatedAt: new Date()},

     {kategoriId: 12, namaKategori: 'Business Casual', createdAt: new Date(), updatedAt: new Date()},
     {kategoriId: 12, namaKategori: 'Professional Attire', createdAt: new Date(), updatedAt: new Date()},

     {kategoriId: 13, namaKategori: 'Traditional Clothing', createdAt: new Date(), updatedAt: new Date()},
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
