const router = require("express").Router();
const cloudinary = require("../utils/CloudinaryConfig");
const upload = require("../utils/MulterConfig");
const musics = require("../models/Music");

router.post("/", upload.single("file"), async (req, res) => {
  try {
    // Upload image to cloudinary
    //set  { resource_type: "video" } for audio or video upload
    //remove it after for image upload
    const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "video" });
    // console.log(result)
    // Create new user
    let music = new musics({
      fileName:result.original_filename,
      songURL: result.secure_url,
      cloudinaryID: result.public_id,
    });
    // Save user
    await music.save();
    res.json({music,msg:'uploaded successfully'});
  } catch (err) {
    res.json({msg:'upload failed'});
  }
});

router.get("/", async (req, res) => {
  try {
    let music = await musics.find();
    res.json(music);
  } catch (err) {
    console.log(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Find user by id
    let music = await musics.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(music.cloudinaryID);
    // Delete user from db
    await music.remove();
    res.json({
      msg:'Deleted successfully'
    });
  } catch (err) {
    res.json({msg:'delete failed'});
  }
});

// router.put("/:id", upload.single("image"), async (req, res) => {
//   try {
//     let user = await musics.findById(req.params.id);
    // Delete image from cloudinary
//     await cloudinary.uploader.destroy(user.cloudinary_id);
    // Upload image to cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path);
//     const data = {
//       cloudinary_id: result.public_id || user.cloudinary_id,
//     };
//     user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
//     res.json(user);
//   } catch (err) {
//     console.log(err);
//   }
// });

//download

router.get("/:id", async (req, res) => {
  try {
    console.log(req.query)
    const name = req.query.fileName;
    const path = req.query.filePath;
    res.download(path, name)
    res.send({ msg: 'file downloaded' })
  } catch (err) {
    res.send({ msg: 'download failed' })
  }
})

module.exports = router;
