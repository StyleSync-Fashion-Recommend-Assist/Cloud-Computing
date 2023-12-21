// Import All Necessary Models
const { Closet, User, Occupation, Kategori, SubKategori, Warna, Outfit, OutfitItem } = require('../../../models');
const { Op } = require("sequelize");

// * POST METHOD */
const handlerAddItem = async (req, res) => {
    try{
        // * Cari User dengan UUID
        const uuid = req.user.uuid;
        const { userId, kategoriId, subKategoriId, warnaId, items } = req.body;
        const user = await User.findOne_({
            where: {uuid: uuid},
        });

        console.log(user.token);

        if (!user.token) {
            res.status(403).json({
                status: "Failed",
                message: "User ini udah Log Out",
            });
        }
        // Create data in Closet
        const closet = await Closet.create({
            userId,
            kategoriId,
            subKategoriId,
            warnaId,
        });

        // Create Data in OutfitItem
        //! Masih Bingung buat yang ini sih:
        const item = await Promise.all(
            items.map( async (item) => {
                const newItem = await OutfitItem.create({
                    itemId: item.itemId,
                    namaItem: item.item_name,
                });
                return newItem;
            })
        );

        res.status(201).json({
            status: "Success",
            message: "Berhasil menambahkan item",
            data: {
                id: closet.id,
                userId: closet.userId,
                kategoriId: closet.kategoriId,
                subKategoriId: closet.subKategoriId,
                warnaId: closet.warnaId,
                itemId: item.itemId,
                namaItem: item.namaItem,
                photoImage: item.photoImage,
            }
        });
    } catch (error){
        console.error('Error occured', error);
        res.status(500).json({
            status: "Failed",
            message: error.message,
            data: null,
        });
    }
}

const handlerChangeFav = async (req, res) => {
    try{ 
        const { id, userId } = req.body;
        const closet = await Closet.findOne({
            where: {id, userId},
        });

        if (!closet) {
            throw new Error('Closet not found');
        }

        closet.isFavorite = true;
        await closet.save();

        res.status(200).json({
            status: "Success",
            message: "Berhasil change favorite",
        }); 
    } catch (error) {
        console.error('Error occured', error);
        res.status(500).json({
            status: "Failed",
            message: error.message,
            data: null,
        });
    }
};

//* GET */
const handlerGetClosetById = async (req, res) => {
    try{
        const {id} = req.params;
        const closet = await Closet.findOne({
            where: {id},
        });

        if (!closet) {
            throw new Error('Closet not found');
        }

        res.status(200).json({
            status: "Success",
            message: "Berhasil ngambil data closet berdasarkan id",
            data: {
                closet
            }
        });
    } catch(error){
        console.error('Error occured', error);
        res.status(500).json({
            status: "Failed",
            message: error.message,
            data: null,
        });
    }
};

const handlerGetItemByOutfitId = async (req, res) => {
    try {
        const uuid = req.user.uuid;
        const { userId, outfitId } = req.body;

        // Cek User
        const user = await User.findOne({
            where: {
                uuid: uuid
            }
        }); 

        console.log(user.token);

        // Kalau User logout 
        if (!user.token){
            res.status(403).json({
                status: "Failed",
                message: "User ini udah Log Out",
            });
        }

        // Cari Outfit dengan OutfitId:
        const outfit = await Outfit.findByPk(outfitId);
        if (!outfit) {
            res.status(404).json({
                error: "Outfit not found",
            });
        }

        // Cari Item dari OutfitId
        const items = await OutfitItem.findAll({
            where: {outfitId: outfitId},
        })

        res.status(200).json({
            status: "Success",
            message: "Berhasil ngambil data",
            data: items
        })
    } catch (error){
        console.error('Error occured', error);
        res.status(500).json({
            status: "Failed",
            message: error.message,
            data: null,
        });
    }
};

const handlergetItemByCategory = async (req, res) => {
    try {
        const uuid = req.user.uuid;
        const { userId, kategoriId } = req.body;
        // Cek User
        const user = await User.findOne({
            where: {
                uuid: uuid
            }
        }); 

        console.log(user.token);

        // Kalau User logout 
        if (!user.token){
            res.status(403).json({
                status: "Failed",
                message: "User ini udah Log Out",
            });
        }

        const item = await OutfitItem.findAll({
            where: {kategoriId: kategoriId},
            include: [{
                model: Kategori,
                attributes: ["namaKategori"],
            },
        ],
        });

        res.status(200).json({
            status: "Success",
            message: "Berhasil ngambil data",
            data: item
        });
    } catch(error){
        console.error('Error occured', error);
        res.status(500).json({
            status: "Failed",
            message: error.message,
            data: null,
        });
    }
}; 

const handlergetItemBySubCategory = async (req, res) => {
    try {
        const uuid = req.user.uuid;
        const { userId, subkategoriId } = req.body;
        // Cek User
        const user = await User.findOne({
            where: {
                uuid: uuid
            }
        }); 

        console.log(user.token);

        // Kalau User logout 
        if (!user.token){
            res.status(403).json({
                status: "Failed",
                message: "User ini udah Log Out",
            });
        }

        
        const item = await OutfitItem.findAll({
            where: {subKategoriId: subkategoriId},
            include: [{
                model: SubKategori,
                attributes: ["namaKategori"],
            },
        ],
        });

        res.status(200).json({
            status: "Success",
            message: "Berhasil ngambil data",
            data: item
        });
    } catch(error){
        console.error('Error occured', error);
        res.status(500).json({
            status: "Failed",
            message: error.message,
            data: null,
        });
    }
}; 

const handlerGetAllKategori = async (req, res) => {
    try{
        const uuid = req.user.uuid;
        const user = await User.findOne({
            where: {
                uuid: uuid
            }
        }); 

        console.log(user.token);

        // Kalau User logout 
        if (!user.token){
            res.status(403).json({
                status: "Failed",
                message: "User ini udah Log Out",
            });
        }

        const kategori = await Kategori.findAll().map((kategori) => kategori.namaKategori);
        res.status(200).json({
            status: "Success",
            message: "List kategori",
            data: kategori
        });
    } catch (error) {
        console.error('Error occurred', error);
        res.status(500).json({
            status: "Failed",
            message: error.message,
            data: null,
        });
    }
}; 

const handlerGetSubByCategory = async (req, res) => {
    try {
        const uuid = req.user.uuid;
        const { kategoriId } = req.body;

        const user = await User.findOne({
            where: {
                uuid: uuid
            }
        }); 

        console.log(user.token);

        // Kalau User logout 
        if (!user.token){
            res.status(403).json({
                status: "Failed",
                message: "User ini udah Log Out",
            });
        }

        const subCat = await SubKategori.findAll({
            where: {kategoriId},
        })

        res.status(200).json({
            status: "Success",
            message: "Success get subcategory",
            data: subCat,
        }); 
    } catch (error){
        console.error('Error occurred', error);
        res.status(500).json({
            status: "Failed",
            message: error.message,
            data: null,
        });
    }
}; 

const handlerGetOutfitByName = async (req, res) => {
    try {
        const uuid = req.user.uuid;
        const user = await User.findOne({
            where: {
                uuid: uuid
            }
        }); 

        console.log(user.token);

        // Kalau User logout 
        if (!user.token){
            res.status(403).json({
                status: "Failed",
                message: "User ini udah Log Out",
            });
        }

        const { name } = req.query;

        const outfit = await Closet.findAll({
            include: [{
                model: Outfit,
                as: 'outfit',
                attributes: [],
                where: {
                    namaOutfit: {
                        [Op.like]: `%${name}%`
                    }
                }
            },   
        ], attributes: ["id", "dominanWarna", "gender", "size"], 
        });

        res.status(200).json({
            status: "Success",
            message: "Berhasil mendapatkan data berdasarkan nama",
            name: name,
            data: outfit,
        });
    } catch (error) {
        console.error('Error occured', error);
        res.status(500).json({
            status: "Failed",
            message: error.message,
            data: null,
        });
    }
};

// TODO: Put Method dan Delete Method Belom
// * PUT METHOD * /
const handlerUpdateData = async (req, res) => {
    try{
        const uuid = req.user.uuid;
        const { userId, items } = req.body;
        const user = await User.findOne({
            where: {
                uuid: uuid
            }
        }); 

        console.log(user.token);

        // Kalau User logout 
        if (!user.token){
            res.status(403).json({
                status: "Failed",
                message: "User ini udah Log Out",
            });
        }

        const item = await OutfitItem.findOne({
            where: {itemId: items.itemId},  
        }); 

        if (!item){
            res.status(404).json({
                status: "Failed",
                error: "Item not found",
            });
        }
        item.kategoriId = items.kategoriId;
        item.subKategoriId = items.subKategoriId;
        item.namaItem = items.item_name;

        await item.save();
        res.status(200).json({
            status: "Success",
            message: "Update data success",
        })
    } catch (error){
        console.error('Error occurred', error);
        res.status(500).json({
            status: "Failed",
            message: error.message,
            data: null,
        });
    }
}


// * DELETE METHOD * /
const handlerDeleteClosetItem = async (req, res) => {
    try {
        const uuid = req.user.uuid;
        const { itemId } = req.body;
        const user = await User.findOne({
            where: {
                uuid: uuid
            }
        }); 

        console.log(user.token);

        // Kalau User logout 
        if (!user.token){
            res.status(403).json({
                status: "Failed",
                message: "User ini udah Log Out",
            });
        }

        const item = await OutfitItem.findOne({
            where: {itemId: itemId},
        });

        await item.destroy();
        res.status(200).json({
            status: "Success",
            message: "Success delete item",
        });
    } catch (error){
        console.error('Error occurred', error);
        res.status(500).json({
            status: "Failed",
            message: error.message,
            data: null,
        });
    }
}
// * Module exports
module.exports = {
    handlerAddItem, 
    handlerChangeFav,
    handlerDeleteClosetItem,
    handlerGetAllKategori,
    handlerGetClosetById,
    handlerGetItemByOutfitId,
    handlergetItemByCategory,
    handlergetItemBySubCategory,
    handlerGetSubByCategory,
    handlerGetOutfitByName,
    handlerUpdateData
}