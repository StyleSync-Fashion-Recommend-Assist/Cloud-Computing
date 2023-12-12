const { Outfit, User, Occupation } = require('../../../models');

const handlerGetOutfitById = async (req, res) => {
    try {
        const { userId, outfitId } = req.body;
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
            data: {
                Outfit: outfit,
            }
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
        const { userId, occupationId } = req.body;
        // Cek data berdasarkan Outfit Id dan User Id
        const outfit = await Outfit.findOne({
            where: {userId: userId, occupationId: occupationId},
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
            data: {
                Outfit: outfit,
            }
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

const handlerAddOutfit = async (req, res) => {
    try {
        const { userId, occupationId, namaOutfit, isFavorite} = req.body;
        const outfit = await Outfit.create({
            userId,
            occupationId,
            namaOutfit,
            isFavorite,
        });

        res.status(201).json({
            status: "Success",
            message: "Berhasil nambah Outfit",
            data: {
                Outfit: outfit,
            }
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

const handlerChangeFavorite = async (req, res) => {
    try{
        const {id, userId} = req.body;
        const outfit = await Outfit.findOne({
            where: {id, userId},
        })

        if (!outfit){
            throw new Error("Outfit not found");
        }

        outfit.isFavorite = true;
        await outfit.save();

        res.status(200).json({
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

const handlerUpdateOutfit = async (req, res) => {
    try{
        const { userId, occupationId, namaOutfit, isFavorite } = req.body;
        const outfit = await Outfit.findOne({
            where: {userId},
        }); 

        await outfit.update({
            namaOutfit,
            isFavorite,
        });

        res.status(200).json({
            status: "Success",
            message: "Update Outfit Success",
            data: {
                Outfit: outfit,
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

const handlerDeleteOutfit = async (req, res) => {
    try {
        const {id} = req.body;
        const outfit = await Outfit.findByPk(id);

        if (!outfit){
            throw new Error("Outfit not found");
        }

        await outfit.destroy();

        res.status(200).json({
            status: "Success",
            message: "Berhasil menghapus outfit dari database",
            data: null,
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

module.exports = {
    handlerGetOutfitById,
    handlerGetOutfitByOccupation,
    handlerAddOutfit,
    handlerChangeFavorite,
    handlerUpdateOutfit,
    handlerDeleteOutfit
}



