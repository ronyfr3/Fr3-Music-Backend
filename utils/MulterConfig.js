const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
      let ext = path.extname(file.originalname);  
      if (ext !== ".mp3" && ext !== ".m4a" && ext !== ".wav" && ext !== ".3gp") {
        cb(new Error("File type is not supported"), false);
        return;
      }
      cb(null, true);
    },
    // specify limit filesize 20MB
    limits:{fileSize:1*1024*1024*20}
  });