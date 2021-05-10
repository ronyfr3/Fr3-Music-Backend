const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);  
    if (ext !== ".mp3" && ext !== ".mp4" && ext !== ".ogg" && ext !== ".webM" ) {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});