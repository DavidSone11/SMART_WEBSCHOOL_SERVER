var csvWriter = require('csv-write-stream')
var writer = csvWriter()
var fs = require('fs');
var createCsvWriter = require('csv-writer').createObjectCsvWriter;

var pathTo = "/UploadContainer/"

var csvOBJ = {

    writeToCSV: function (writeDATA, filename) {
        //var writer = csvWriter({ headers: csvOBJ.createHeaders()});

        var writer = csvWriter();
        writer.pipe(fs.createWriteStream(filename))
        writer.write(writeDATA)
        writer.end()
    },

    createHeaders: function () {
        return ["TrainNo", "islno", "stationCode", "DayofJourney", "Arrivaltime", "Departuretime", "Distance", "locoType"];
    },

    writeToCSVWithCsvWriter: function (filename) {

        var csvWriter = createCsvWriter({
            path: filename,
            header: [
                { id: 'trainno', title: 'TrainNo' },
                { id: 'islno', title: 'ISLNo' },
            ]
        });

        const records = [
            { trainno: 'Bob', islno: 'French, English' },
            { trainno: 'Mary', islno: 'English' }
        ];

        csvWriter.writeRecords(records)       // returns a promise
            .then(() => {
                console.log('...Done');
            });

    },

    writeToCSVWithFs: function (dataToWrite,filename) {
        
        try{
        var buf = new Buffer(dataToWrite);
        fs.writeFile('formList.csv',dataToWrite, 'utf8', function (err) {
            if (err) {
                console.log('Some error occured - file either not saved or corrupted file saved.'+err);
            } else {
                console.log('It\'s saved!');
            }
        });
    }catch(e){
        console.log(e);
    }
    }


}

module.exports = csvOBJ;