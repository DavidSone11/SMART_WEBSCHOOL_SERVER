var mongoose = require('mongoose');
var trainStationSchema = new mongoose.Schema({
    trainNo: { type: Number, required: true },
    stopNo: { type: Number, required: true },
    stationCode: String,
    arrivalTime: String,
    departureTime: String,
    arrivalMinutes: { type: Number, required: true },
    departureMinutes: { type: Number, required: true },
    arrivalDateTime: { type: Date },
    departureDateTime: { type: Date },
    arrivalDay: { type: Number },
    departureDay: { type: Number },
    dayOfJourney: { type: Number, required: true },
    distance: { type: Number, required: true },
    locoType: String,
    isLocoChange: { type: Boolean, default: false },
    markDelete: { type: Boolean, default: false },
    createdTime: { type: Date, default: Date.now }
})
module.exports = mongoose.model('trainStation', trainStationSchema);