const mongoose = require('mongoose')
const MusicSchema = new mongoose.Schema({
    songURL: { type: String },
    fileName: { type: String },
    cloudinaryID:{type:String}
})
const musics = mongoose.model('musics', MusicSchema)
module.exports=musics