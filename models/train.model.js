var mongoose = require('mongoose');
var trainSchema = new mongoose.Schema({
    trainNo: {type:Number,default:0},
    trainName:  { type: String, default: null },
    fromStation:  { type: String, default: null },
    toStation:  { type: String, default: null },
    runningDays: [{ type: Number }],
    trainType: { type: String, default: null },
    locoType:  { type: String, default: null },
    createdTime: { type: Date, default: Date.now },
    markDelete: { type: Boolean, default: false },
})
module.exports = mongoose.model('train', trainSchema);