var mongoose = require('mongoose');
var userFileUploadSchema = new mongoose.Schema({
    data: { type: String, lowercase: false },
    fileName: { type: String, lowercase: false },
    extension: { type: String, lowercase: false },
    fileType: { type: String, lowercase: false },
    originalFileName: { type: String, lowercase: false },
    uploadedBy: { type: String, lowercase: false },
    isProcessed: { type: Boolean, default: false },
    status: { type: String, default: null },
    message: String,
    markDelete: { type: Boolean, default: false },
    uploadedTime: { type: Date, default: Date.now }
})
module.exports = mongoose.model('userFileUpload', userFileUploadSchema);