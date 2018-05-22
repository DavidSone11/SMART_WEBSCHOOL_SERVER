var csvWriter = require('csv-write-stream')
var writer = csvWriter()
var fs = require('fs');

var pathTo = "/UploadContainer/"

var csvOBJ = {

    writeToCSV: function (writeDATA,filename) {
        //var writer = csvWriter({ headers: csvOBJ.createHeaders()});
        
        var writer =  csvWriter();
        writer.pipe(fs.createWriteStream(filename))
        writer.write(writeDATA)
        writer.end()
    },

    createHeaders: function () {
        return ["TrainNo", "islno", "stationCode", "DayofJourney", "Arrivaltime", "Departuretime", "Distance", "locoType"];
    }


}

module.exports = csvOBJ;