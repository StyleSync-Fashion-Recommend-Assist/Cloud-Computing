function createAssociation(sequelize) {
  // console.log(sequelize.models);
  const {
    Closet,
    Kategori,
    MarketPlaceFindings,
    Occupation,
    Outfit,
    OutfitItem,
    SubKategori,
    User,
    ResPassword,
    Warna
  } = sequelize.models;

  // User with Reset Password
  User.hasMany(ResPassword,{
    foreignKey: "userId",
    sourceKey: "id"
  });

  ResPassword.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id"
  });
  
  // Users With MarketPlaceFindings
  User.hasMany(MarketPlaceFindings, {
    foreignKey: "userId",
    sourceKey: "id"
  });

  MarketPlaceFindings.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id"
  });
  
  // User With Closet
  User.hasMany(Closet, {
    foreignKey: "userId",
    sourceKey: "id"
  });

  Closet.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id" 
  });
  
  // User With Outfit
  User.hasMany(Outfit, {
    foreignKey: "userId",
    sourceKey: "id"
  });
  
  Outfit.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id"
  });

  // Closet With Occupation
  Occupation.hasMany(Closet, {
    foreignKey: "occupationId",
    sourceKey: "id"
  });

  Closet.belongsTo(Occupation, {
  foreignKey: "occupationId",
  targetKey: "id"
  });
  
  // Closet With Kategori
  Kategori.hasMany(Closet, {
    foreignKey: "kategoriId",
    sourceKey: "id"
  });

  Closet.belongsTo(Kategori, {
    foreignKey: "kategoriId",
    targetKey: "id"
  });


  // Closet With SubKategori
  SubKategori.hasMany(Closet, {
    foreignKey: "subKategoriId",
    sourceKey: "id"
  });

  Closet.belongsTo(SubKategori, {
    foreignKey: "subKategoriId",
    targetKey: "id"
  });

  // Kategori With Subkategori
  Kategori.hasMany(SubKategori, {
    foreignKey: "kategoriId",
    sourceKey: "id"
  });
  
  SubKategori.belongsTo(Kategori, {
    foreignKey: "kategoriId",
    targetKey: "id"
  });

  // Closet With Warna
  Warna.hasMany(Closet, {
    foreignKey: "warnaId",
    sourceKey: "id"
  });

  Closet.belongsTo(Warna, {
    foreignKey: "warnaId",
    targetKey: "id"
  });
  
  // Occupation With Outfit
  Occupation.hasMany(Outfit, {
    foreignKey: "occupationId",
    sourceKey: "id"
  });

  Outfit.belongsTo(Occupation, {
    foreignKey: "occupationId",
    targetKey: "id"
  });

  // Outfit With OutfitItem
  Outfit.hasMany(OutfitItem, {
    foreignKey: "outfitId",
    sourceKey: "id"
  });

  OutfitItem.belongsTo(Outfit, {
    foreignKey: "outfitId",
    targetKey: "id"
  });

  OutfitItem.belongsTo(Kategori, {
    foreignKey: "kategoriId",
    targetKey: "id"
  }); 

  OutfitItem.belongsTo(SubKategori, {
    foreignKey: "subKategoriId",
    targetKey: "id"
  }); 
}

module.exports = createAssociation;