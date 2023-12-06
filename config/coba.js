const env = process.env.NODE_ENV?.trim() || 'development';
const config = require(__dirname + '/../config/config.js')[env];
console.log(config);