const { User, Outfit, Closet, Kategori, SubKategori, OutfitItem, Occupation } = require('../../../models');

// Masih belum yakin sih gw
/* CLOSET */
const handlerAddItems = async (req, res, next) => { 
    try {
        const {userId, kategoriId, subKategoriId, warnaId, occupationId, 
        dominanWarna, gender, size, favorite} = req.body;
        const existingCloset = await Closet.findOne({
            where: {
                userId: userId
            }
        });

        if (existingCloset){
            // Kalau udah ada berdasarkan userId
            await existingCloset.update({
                dominanWarna: dominanWarna,
                gender: gender,
                size: size,
                favorite: favorite
            });

            res.status(201).json({
                status: "Success",
                message: "Berhasil menambahkan item ke closet",
                data: {
                    item: existingCloset,
                },
            });
        } else { 
            // Kalau belum ada berdasarkan userId
            const newCloset = await Closet.create({
                userId: userId,
                kategoriId: kategoriId,
                subKategoriId: subKategoriId,
                warnaId: warnaId,
                occupationId: occupationId,
                dominanWarna: dominanWarna,
                gender: gender,
                size: size,
                favorite: favorite
            }); 

            res.status(201).json({
                status: "Success",
                message: "Berhasil membuat closet baru",
                data: {
                    item: newCloset,
                }
            });
        }
    } catch (error){
        next(error)
    }
};

const handlerGetItemById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const item = await Closet.findOne({
            where: {
                id: id,
            },
        });

        if (!item){
           throw new Error("Book not found");
        }

        res.status(200).json({
            status: 'Success',
            message: "Baiklah",
            data: {
                Item: item,
            },
        });
    } catch (error){
        next(error);
    }
};

/* OUTFIT */
const handlerGetOutfit = async (req, res) => {
    try{
        const {userId} = req.params;
        // Cek data berdasarkan userId dari tabel Outfit
        const outfits = await Outfit.findAll({
            where: {userId},
            include: [
                {model: User, attributes: [
                    'name', 'email', 'gender'
                ]},
                {model: Occupation, attributes: [
                    'occupationName'
                ]}
            ],
        });

        // Kirim response ke server
        res.status(200).json({
            status: 'Success',
            message: "Berhasil mengambil semua outfit",
            data: {
                Outfit: outfits,
            },
        })
    } catch (error){
        console.error('Error occured', error);
        res.status(500).json({
            status: 'Failed',
            message: error.message,
            data: null,
        });
    }
};

