// Buat Function untuk Membuat MarketPlaceFindResults Database
function createMarketPlaceResultsDb (sequelize, DataTypes) {
    const MarketPlaceFindResults = sequelize.define('MarketPlaceFindResults', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Users",
                key: 'id',
            },
            allowNull: false,
        },
        productImage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        productPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        marketplaceOrigin: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        productLink: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isFavorite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        tableName: "MarketPlaceFind",
    });

    return MarketPlaceFindResults;
}

module.exports = createMarketPlaceResultsDb;



