require('dotenv').config({ path: __dirname+ '../../.env' });

module.exports = {
    "development": {
        "database": process.env.DB_NAME,
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "host": process.env.DB_HOST,
        "dialect": process.env.DB_DIALECT
    }, 

    "test": {
        "username": process.env.USERNAME_DB,
        "password": process.env.PASSWORD_DB,
        "database": process.env.DB_test,
        "host": process.env.HOST,
        "dialect": process.env.DIALECT
      },

    "production": {
    "username": process.env.USERNAME_DB,
    "password": process.env.PASSWORD_DB,
    "database": process.env.DB_prod,
    "host": process.env.HOST,
    "dialect": process.env.DIALECT
  }
}