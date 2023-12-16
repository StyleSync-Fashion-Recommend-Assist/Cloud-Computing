// Import All Necessary Models
const { Closet, User, Occupation, Kategori, SubKategori, Warna, Outfit, OutfitItems } = require('../../../models');
const { Op } = require("sequelize");

/* POST METHOD */
const handlerAddItem = async (req, res) => {
    try {
        const { userId, itemName, kategoriName, subKategoriName, warnaName } = req.body;
        // Cek apakah userId ini ada atau gak di tabel User:
        const user = await User.findByPk(userId);
        if (!user){
            throw new Error('User not found');
        }

        // Cari Items, Kategori, SubKategori, dan Warna berdasarkan namanya
        // Kalau gak ada, dibuat di tabel:
        const [ item, createdItem ] = await OutfitItems.findOrCreate({
            where: {namaItem: itemName},
        });
        
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
            name: item.namaItem,
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

// TODO: Fix this
/* PUT METHOD */
/* const handlerUpdateCloset = async (req, res) => {
    try {
        const { userId, itemName, kategoriName, subKategoriName, warnaName } = req.body;
        const user = await User.findByPk(userId);
        if (!user){
            throw new Error('User not found');
        }

        // Cari Items, Kategori, SubKategori, dan Warna berdasarkan namanya
        
    }
} */

/* DELETE METHOD */
const handlerDeleteCloset = async (req, res) => {
    try {
        const {id} = req.params;
        const closet = await Closet.findByPk(id);
        if (!closet){
            throw new Error('Closet not found');
        }

        await closet.destroy();
        res.status(200).json({
            status: "Success",
            message: "Berhasil menghapus closet dari database",
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
