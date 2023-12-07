function createAssociation(sequelize) {
    const {
      MarketPlaceFindResults,
      Closet,
      SubCategories, 
      Categories,
      Colors,
      Occupation,
      Outfit,
      OutfitItem,
      Users
    } = sequelize.models;
    
    /* 
    ***
        Setup Tabel Userss untuk dikaitkan dengan
        tabel lainnya:
        Users - MarketPlaceFindResults
        Users - Closet
        Users - Outfit
    ***
     */

    // Userss With MarketPlaceFindResults
    Users.hasMany(MarketPlaceFindResults, {
      foreignKey: "userId",
      sourceKey: "id"
    });
  
    MarketPlaceFindResults.belongsTo(Users, {
      foreignKey: "userId",
      targetKey: "id"
    });
    
    // Users With Closet
    Users.hasMany(Closet, {
      foreignKey: "userId",
      sourceKey: "id"
    });
  
    Closet.belongsTo(Users, {
      foreignKey: "userId",
      targetKey: "id" 
    });
    
    // Users With Outfit
    Users.hasMany(Outfit, {
        foreignKey: "userId",
        sourceKey: "id"
    });
    
    Outfit.belongsTo(Users, {
      foreignKey: "userId",
      targetKey: "id"
    });

    // Closet With Occupation
    Closet.belongsTo(Occupation, {
      foreignKey: "occupationId",
      targetKey: "id"
    });
    
    Occupation.hasMany(Closet, {
        foreignKey: "occupationId",
        sourceKey: "id"
    });

    Categories.hasMany(SubCategories, {
      foreignKey: "kategoriId",
      sourceKey: "id"
    });
    
    SubCategories.belongsTo(Categories, {
      foreignKey: "kategoriId",
      targetKey: "id"
    });
  
    SubCategories.hasMany(Closet, {
      foreignKey: "subKategoriId",
      sourceKey: "id"
    });
  
    Closet.belongsTo(SubCategories, {
      foreignKey: "subKategoriId",
      targetKey: "id"
    });
  
    Colors.hasMany(Closet, {
      foreignKey: "warnaId",
      sourceKey: "id"
    });
  
    Closet.belongsTo(Colors, {
      foreignKey: "warnaId",
      targetKey: "id"
    });
    
    Occupation.hasMany(Outfit, {
      foreignKey: "occupationId",
      sourceKey: "id"
    });
  
    Outfit.belongsTo(Occupation, {
      foreignKey: "occupationId",
      targetKey: "id"
    });
  
    Outfit.hasMany(OutfitItem, {
      foreignKey: "outfitId",
      sourceKey: "id"
    });
  
    OutfitItem.belongsTo(Outfit, {
      foreignKey: "outfitId",
      targetKey: "id"
    });
  
}
  
module.exports = createAssociation;