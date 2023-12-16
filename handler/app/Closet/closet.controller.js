// Import All Necessary Models
const { Closet, User, Occupation, Kategori, SubKategori, Warna, Outfit } = require('../../../models');
const { Op } = require("sequelize");

/* POST */
const handlerAddItem = async (req, res) => {
    try {
        const { userId, kategoriName, subKategoriName, warnaName } = req.body;
        // Cek apakah userId ini ada atau gak di tabel User:
        const user = await User.findByPk(userId);
        if (!user){
            throw new Error('User not found');
        }

        // Cari Kategori, SubKategori, dan Warna berdasarkan namanya
        // Kalau gak ada, dibuat di tabel:
        const [kategori, createdKategori] = await Kategori.findOrCreate({
            where: {namaKategori: kategoriName},
        }); 

        const [subKategori, createdsubKategori] = await SubKategori.findOrCreate({
            where: {namaKategori: subKategoriName},
        }); 

        const [warna, createdWarna] = await Warna.findOrCreate({
            where: {name: warnaName},
        }); 

        const outfit = await Closet.create({
            userId: user.id,
            kategoriId: kategori.id,
            subKategoriId: subKategori.id,
            warnaId: warna.id,
            dominanWarna: warnaName,
        }); 

        res.status(201).json({
            status: "Success",
            message: "Item berhasil ditambahkan ke Closet",
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

/* GET */
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
        const { Id_user, id_outfit } = req.query;

        const items = await Closet.findAll({
            where: {
                userId: Id_user,
                outfitId: id_outfit
            },
        });

        res.status(200).json({
            status: "Success",
            message: "Berhasil mendapatkan data item berdasarkan Id_user dan id_outfit",
            data: {
                items
            }
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

const handlerGetItemByCategory = async (req, res) => {
    try {
        const { Id_user, id_category } = req.query;

        const items = await Closet.findAll({
            where: {
                userId: Id_user,
                kategoriId: id_category
            },
        });

        res.status(200).json({
            status: "Success",
            message: "Berhasil mendapatkan data item berdasarkan Id_user dan id_category",
            data: {
                items
            }
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

const handlerGetItemBySubCategory = async (req, res) => {
    try {
        const { Id_user, id_sub_category } = req.query;

        const items = await Closet.findAll({
            where: {
                userId: Id_user,
                subKategoriId: id_sub_category
            },
        });

        res.status(200).json({
            status: "Success",
            message: "Berhasil mendapatkan data item berdasarkan Id_user dan id_sub_category",
            data: {
                items
            }
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

const handlerGetOutfitByName = async (req, res) => {
    try {
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

const handlerGetAllCategory = async (req, res) => {
    try {
        const categories = await Kategori.findAll();

        res.status(200).json({
            status: "Success",
            message: "Berhasil mendapatkan semua kategori",
            data: {
                categories
            }
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

const handlerGetSubcategoryByCategory = async (req, res) => {
    try {
        const { id_category } = req.query;

        const subcategories = await SubKategori.findAll({
            where: {
                kategoriId: id_category
            },
        });

        res.status(200).json({
            status: "Success",
            message: "Berhasil mendapatkan subkategori berdasarkan id_category",
            data: {
                subcategories
            }
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

/* 
***
PUT 
    -Update Item  
***
*/
const handlerGetUpdateItem = async (req, res) => {
    try {
        const { Id_user, Ref_item_data } = req.query;

        const closet = await Closet.findOne({
            where: {
                userId: Id_user,
                refItemData: Ref_item_data
            },
        });

        if (!closet) {
            throw new Error('Closet item not found');
        }

        res.status(200).json({
            status: "Success",
            message: "Berhasil mendapatkan data item berdasarkan Id_user dan Ref item data",
            data: {
                closet
            }
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


/* 
***
DELETE
    -Delate Item  
***
*/
const handlerDeleteItem = async (req, res) => {
    try {
        const { Id_item } = req.query;

        const closet = await Closet.findOne({
            where: {
                id: Id_item
            },
        });

        if (!closet) {
            throw new Error('Closet item not found');
        }

        await closet.destroy();

        res.status(200).json({
            status: "Success",
            message: "Berhasil menghapus item berdasarkan Id_item",
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

module.exports = {
    handlerDeleteItem,
};
