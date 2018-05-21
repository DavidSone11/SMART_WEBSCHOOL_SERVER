var mongoose = require('mongoose');
var userUploadSchema = new mongoose.Schema({
    img: { data: Buffer, contentType: String },
    fileType: { type: String, lowercase: false },
    originalFileName: { type: String, lowercase: false },
    filename: { type: String, lowercase: false },
    uploadedBy: { type: String, lowercase: false },
    message: { type: String, lowercase: false },
    markDelete: { type: Boolean, default: false },
    uploadedTime: { type: Date, default: Date.now }
})
module.exports = mongoose.model('userUpload', userUploadSchema);