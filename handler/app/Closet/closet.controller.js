// Import All Necessary Models
const { Closet, User, Occupation, Kategori, SubKategori, Warna } = require('../../../models');

/* POST */
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

/* PUT */

