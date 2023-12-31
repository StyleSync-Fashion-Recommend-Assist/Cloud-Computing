const { Outfit, User, Occupation, OutfitItem } = require('../../../models');


/* GET METHODS */
const handlerGetAllOutfits = async (req, res) => {
    try{ 
        const uuid = req.user.uuid;
        const {userId} = req.body;
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

        // Bila valid, ambil semua data outfit
        const outfit = await Outfit.findAll({
            where: {userId}, 
            attributes: ["namaOutfit"],
        });

        res.status(200).json({
            status: "Success",
            message: "Berhasil ngambil semua data outfit",
            data: outfit,
        });
    } catch (error){
        console.error('Error occured', error);
        res.status(500).json({
            status: 'Failed',
            message: error.message,
            data: null,
        });
    }
};


const handlerGetOutfitById = async (req, res) => {
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
        // Cek data berdasarkan Outfit Id dan User Id
        const outfit = await Outfit.findOne({
            where: {id: outfitId, userId: userId},
            include: [
                {model: User, attributes: [
                    'name', 'email', 'gender'
                ]},
                {model: Occupation, attributes: [
                    'occupationName'
                ]}
            ],
        });

        res.status(200).json({
            status: "Success",
            message: "Berhasil ngambil data outfit",
            data: outfit,
        });
    } catch(error){
        console.error('Error occured', error);
        res.status(500).json({
            status: 'Failed',
            message: error.message,
            data: null,
        });
    }
};

const handlerGetOutfitByOccupation = async (req, res) => {
    try {
        const uuid = req.user.uuid;
        const { userId, occupationId } = req.body;

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

        // Cek apakah ada di tabel occupation:
        const occupation = await Occupation.findOne({
            where: {id: occupationId}
        });

        if (!occupation) {
            res.status(404).json({
                status: "Failed",
                message: "Occupation not found",
                data: null,
            });
        }
        
        // Ambil semua data outfit berdasarkan occupation
        const outfit = await Outfit.findAll({
            where: {userId: userId, occupationId: occupationId},
        });
        
        res.status(200).json({
            status: "Success",
            message: "Berhasil ngambil data outfit",
            data: outfit,
        });
    } catch(error){
        console.error('Error occured', error);
        res.status(500).json({
            status: 'Failed',
            message: error.message,
            data: null,
        });
    }
};

/* POST METHOD */
const handlerAddOutfit = async (req, res) => {
    try {
        const uuid = req.user.uuid;
        const { userId, occupationId, namaOutfit, isFavorite} = req.body;
        // console.log(req.user);
        // console.log(uuid);
        
        const user = await User.findOne({
            where: {
                uuid: uuid
            }
        }); 
        console.log(user.token);
        if (!user.token){
            res.status(403).json({
                status: "Failed",
                message: "User ini udah Log Out",
            });
        }

        const outfit = await Outfit.create({
            userId,
            occupationId,
            namaOutfit,
            isFavorite,
        });

        res.status(201).json({
            status: "Success",
            message: "Berhasil nambah Outfit",
            data: outfit,
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

const handlerAddItemToOutfit = async (req, res) => {
    try {
        const uuid = req.user.uuid;
        const { userId, items} = req.body;

        // Cek User Token
        const user = await User.findOne({
            where: {
                uuid: uuid
            }
        }); 

        console.log(user.token);

        // Kalau User udah logout gabisa tambah Item
        if (!user.token){
            res.status(403).json({
                status: "Failed",
                message: "User ini udah Log Out",
            });
        }
        // Cek apakah userId ini ada atau gak di tabel Outfit:
        const outfit = await Outfit.findOne({
            where: {userId},
        });

        if (!outfit){
            throw new Error("Outfit not found");
        }

        /* Tambahkan item ke dalam outfitItems */
        const item = await Promise.all(
            items.map( async (item) => {
                const newItem = await OutfitItem.create({
                    outfitId: outfit.id,
                    itemId: item.itemId,
                    namaItem: item.item_name,
                    /* item_name itu tergantung penamaanya dari request:
                        {
                        “Id_outfit” : 1
                        “Outfit_name” : a
                        “Favorite” : true
                        “Items”
                        {
                            “Id_item”: ..
                            “item_name”: ..
                        }
                        }
                    */
                });
                return newItem;
            })
        ); 
        res.status(201).json({
            message: "Items berhasil ditambahkan",
            item,
        });
    } catch (error){
        console.error('Error occured', error);
        res.status(500).json({
            status: "Failed",
            message: error.message,
            data: null,
        });
    }
};
const handlerChangeFavorite = async (req, res) => {
    try{
        const uuid = req.user.uuid;
        const {id, userId} = req.body;

        // Cek User 
        const user = await User.findOne({
            where: {
                uuid: uuid
            }
        }); 

        console.log(user.token);

        // Kalau Tokennya habis, gabisa mengubah
        if (!user.token){
            res.status(403).json({
                status: "Failed",
                message: "User ini udah Log Out",
            });
        }

        const outfit = await Outfit.findOne({
            where: {id, userId},
        })

        if (!outfit){
            throw new Error("Outfit not found");
        }

        outfit.isFavorite = true;
        await outfit.save();

        res.status(201).json({
            status: "Success",
            message: "Change Favorite Success",
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

/* PUT METHOD */
const handlerUpdateOutfit = async (req, res) => {
    try{
        const uuid = req.user.uuid;
        const { userId, occupationId, namaOutfit, isFavorite } = req.body;
        // Cek User 
        const user = await User.findOne({
            where: {
                uuid: uuid
            }
        }); 

        console.log(user.token);

        // Kalau Tokennya habis, gabisa mengubah
        if (!user.token){
            res.status(403).json({
                status: "Failed",
                message: "User ini udah Log Out",
            });
        }
        const outfit = await Outfit.findOne({
            where: {userId},
        }); 

        await outfit.update({
            occupationId,
            namaOutfit,
            isFavorite,
        });
        await outfit.save();
        
        res.status(200).json({
            status: "Success",
            message: "Update Outfit Success",
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

/* DELETE METHOD */
const handlerDeleteOutfit = async (req, res) => {
    try {
        const uuid = req.user.uuid;
        const {id} = req.params;
        // Cek User 
        const user = await User.findOne({
            where: {
                uuid: uuid
            }
        }); 

        console.log(user.token);

        // Kalau Tokennya habis, gabisa mengubah
        if (!user.token){
            res.status(403).json({
                status: "Failed",
                message: "User ini udah Log Out",
            });
        }
        const outfit = await Outfit.findByPk(id);

        if (!outfit){
            throw new Error("Outfit not found");
        }

        await outfit.destroy();

        res.status(200).json({
            status: "Success",
            message: "Berhasil menghapus outfit dari database",
        });
    } catch (error){
        console.error('Error occured', error);
        res.status(500).json({
            status: "Failed",
            message: error.message,
            data: null,
        });
    }
};

const handlerDeleteItem = async (req, res) => {
    try{
        const uuid = req.user.uuid;
        const { id, idItem } = req.body;
        const outfit = await Outfit.findByPk(id);
        // Cek User 
        const user = await User.findOne({
            where: {
                uuid: uuid
            }
        }); 

        console.log(user.token);

        // Kalau Tokennya habis, gabisa mengubah
        if (!user.token){
            res.status(403).json({
                status: "Failed",
                message: "User ini udah Log Out",
            });
        }
        
        if (!outfit){
            throw new Error("Outfit not found");
        }

        // Cari item
        const item = await OutfitItem.findOne({
            where: {
                id: idItem,
                outfitId: id,
            },
        });

        if (!item){
            throw new Error("Item not found");
        }

        await item.destroy();
        res.status(201).json({
            status: "Success",
            message: 'Berhasil delete item',
        });
    } catch(error){
        console.error('Error occured', error);
        res.status(500).json({
            status: "Failded",
            message: "Internal server error",
        });
    }
};

module.exports = {
    handlerGetAllOutfits,
    handlerGetOutfitById,
    handlerGetOutfitByOccupation,
    handlerAddOutfit,
    handlerAddItemToOutfit,
    handlerChangeFavorite,
    handlerUpdateOutfit,
    handlerDeleteOutfit,
    handlerDeleteItem
}