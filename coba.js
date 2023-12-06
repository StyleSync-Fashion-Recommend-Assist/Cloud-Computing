const CryptoJS = require('crypto-js');
const AES = require('crypto-js/aes');

// Contoh penggunaan untuk enkripsi
const plaintextData = 'Hello, World!';
const secretKey = 'your_secret_key';

const encryptedData = AES.encrypt(plaintextData, secretKey).toString();
console.log('Encrypted Data:', encryptedData);

// Contoh penggunaan untuk dekripsi
const decryptedData = AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
console.log('Decrypted Data:', decryptedData);