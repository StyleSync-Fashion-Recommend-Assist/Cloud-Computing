function createColorsDb (sequelize, DataTypes) {
    const colours = sequelize.define('Colors', {
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
        tableName: "Colors",
    });

    return colours;
}

module.exports = createColorsDb;
