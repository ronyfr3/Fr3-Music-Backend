const musics = require("../models/Music");
const cloudinary = require("../utils/CloudinaryConfig");
const AppError = require('../Error/ErrorClass');
const catchAsync = require("../Error/catchAsync");

//post
const postMusic = catchAsync(async (req, res, next) => {
  const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "video" });
  if (!result) {
    throw new AppError('Updated failed!',404)
  }
   let music = new musics({
      fileName: result.original_filename,
      songURL: result.secure_url,
      cloudinaryID: result.public_id,
    });
    await music.save();
    res.status(200).json({
      msg: 'uploaded successfully'
    });
})

//get
const getMusic = catchAsync(async (req, res,next) => {
  let music = await musics.find();
  if (!music) {
    throw new AppError("Can't get Music",404)
  }
  res.status(200).json(music);
})
//delete
const deleteMusic =  catchAsync(async (req, res,next) => {
  let music = await musics.findById(req.params.id);
  if (!music) {
    throw new AppError("Can't Delete Music",400)
  }
    // Delete music from cloudinary
    await cloudinary.uploader.destroy(music.cloudinaryID);
    // Delete music from db
    await music.remove();
    res.status(200).json({
      msg:'Delete successfully'
    });
})
//download
const downloadMusic = catchAsync(async (req, res,next) => {
        console.log(req.query)
        const name = req.query.fileName;
  const path = req.query.filePath;
  if (!name || !path) {
    throw new AppError("Can't Download Music",400)
  }
        res.download(path, name)
        res.status(200).json({ msg: 'file downloaded' })
})
//update
const updateMusic = catchAsync(async (req, res, next) => {
  let music = await musics.findById(req.params.id);
  if (!music) {
    throw new AppError('Update failed', 400)
  }
  // Delete image from cloudinary
  await cloudinary.uploader.destroy(music.cloudinary_id);
  // Upload image to cloudinary
  const result = await cloudinary.uploader.upload(req.file.path);
  const data = {
    cloudinary_id: result.public_id || music.cloudinary_id,
  };
  music = await musics.findByIdAndUpdate(req.params.id, data, { new: true });
  res.json(music);
})
module.exports = {
    postMusic,
    getMusic,
    deleteMusic,
    downloadMusic,
    updateMusic
}