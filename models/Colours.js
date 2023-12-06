function createColoursDb (sequelize, DataTypes) {
    const colours = sequelize.define('Colours', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
    {
        tableName: "Colours",
    });

    return colours;
}

module.exports = createColoursDb;
