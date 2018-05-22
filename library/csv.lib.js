var csvWriter = require('csv-write-stream')
var writer = csvWriter()


var csvOBJ = {

    writeToCSV: function (writeDATA,filename) {
        var writer = csvWriter({ headers: createHeaders()});
        writer.pipe(fs.createWriteStream(filename))
        writer.write(writeDATA)
        writer.end()
    },

    createHeaders: function () {
        return ["TrainNo", "islno", "stationCode", "DayofJourney", "Arrivaltime", "Departuretime", "Distance", "locoType"];
    }


}

module.exports = csvOBJ;