var mongoose = require('mongoose');
var uerUploadSchema = new mongoose.Schema({
    img: { data: Buffer, contentType: String },
    dataType: String,
    fileType: String,
    originalFileName: String,
    uploadedBy: String,
    message: String,
    markDelete: { type: Boolean, default: false },
    uploadedTime: { type: Date, default: Date.now }
})
module.exports = mongoose.model('uerUploads', uerUploadSchema);