const musics = require("../models/Music");
const cloudinary = require("../utils/CloudinaryConfig");

//post
const postMusic = async (req, res,next) => {
  try {
    // Upload image to cloudinary
    //set  { resource_type: "video" } for audio or video upload
    //remove it after for image upload
    const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "video" });
    // console.log(result)
    // Create new music
    let music = new musics({
      fileName:result.original_filename,
      songURL: result.secure_url,
      cloudinaryID: result.public_id,
    });
    // Save music
    await music.save();
    res.status(200).json({
      msg: 'uploaded successfully'
    });
  } catch (error) {
    next(error)
  }
}
//get
const getMusic = async (req, res,next) => {
  try {
    let music = await musics.find();
    res.status(200).json(music);
  } catch (error) {
    next(error)
  }
}
//delete
const deleteMusic =  async (req, res,next) => {
  try {
    let music = await musics.findById(req.params.id);
    // Delete music from cloudinary
    await cloudinary.uploader.destroy(music.cloudinaryID);
    // Delete music from db
    await music.remove();
    res.status(200).json({
      msg:'Delete successfully'
    });
  } catch (error) {
      next(error)
  }
}
//download
const downloadMusic = async (req, res,next) => {
    try {
        console.log(req.query)
        const name = req.query.fileName;
        const path = req.query.filePath;
        res.download(path, name)
        res.status(200).json({ msg: 'file downloaded' })
        next()
    } catch (err) {
        next(error)
    }
}
//update
const updateMusic = async (req, res,next) => {
  try {
    let music = await musics.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id);
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    const data = {
      cloudinary_id: result.public_id || music.cloudinary_id,
    };
    music = await musics.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(music);
  } catch (err) {
    console.log(err);
  }}
module.exports = {
    postMusic,
    getMusic,
    deleteMusic,
    downloadMusic,
    updateMusic
}