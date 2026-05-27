const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },

  filename: function (req, file, cb) {
    const filename = Date.now() + Math.random();
    const ext = path.extname(file.originalname);
    const validformats = [".jpg", ".jpeg", ".png"];

    if (validformats.includes(ext)) {
      cb(null, `${filename}${ext}`);
    } else {
      cb(new Error("File type is not valid! Try agian with another type"));
    }
  },
});
const maxSize = 1 * 1000 * 1000;
const uploader = multer({ storage, limit: { fileSize: maxSize } });

module.exports = uploader;
