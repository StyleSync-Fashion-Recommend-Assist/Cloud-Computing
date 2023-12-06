// Buat Function untuk reset password:
function createResPasswordDb (sequelize, DataTypes){
    const ResetPassword = sequelize.define(
        'ResetPassword', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
              },
              otp: DataTypes.STRING,
              id_users: {
                type: DataTypes.INTEGER,
                references: {
                  model: "Users",
                  key: "id",
                },
                allowNull: false,
              },
              createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
              },
              updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
              },
            },
            {
                tableName: "ResetPassword",
            }
    );
    return ResetPassword;
}

module.exports = createResPasswordDb;