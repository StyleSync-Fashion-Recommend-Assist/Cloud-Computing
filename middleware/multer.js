const Multer = require('multer');
const typeImage = ["image/png", "image/jpg", "image/jpeg"];

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 50 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (!typeImage.includes(file.mimetype)) {
            cb(new Error("File not supported"), false);
        }
        cb(null, true);
    }
});

module.exports = multer;