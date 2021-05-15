const router = require("express").Router();
const upload = require("../utils/MulterConfig");
const {postMusic,getMusic,deleteMusic,downloadMusic,updateMusic} =require('../controllers/music')
//post
router.post("/", upload.single("file"),postMusic);
//get
router.get("/",getMusic);
//delete
router.delete("/:id",deleteMusic);
//download
router.get("/:id", downloadMusic)
//update
router.put("/:id", upload.single("file"),updateMusic)
module.exports = router;
