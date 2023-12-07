'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const setupAssoDb = require('../utils/setupAssoDb');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV?.trim() || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;

sequelize = new Sequelize(config.database, config.username, config.password, config);

// console.log('Berhasil 1');
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const createModelFunction = require(path.join(__dirname, file));
    const model = createModelFunction(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

setupAssoDb(sequelize);
// console.log('Berhasil Dua');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// console.log('Berhasil 3');
module.exports = db;