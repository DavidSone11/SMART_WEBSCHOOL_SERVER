var express = require('express');
var router = express.Router();
var userFileUploadModel = require("../models/userFileUpload.model")
var trainstationModel = require("../models/trainstation.model")
var Promise = require("bluebird");
require('mongoose-query-paginate');
var fs = require('fs');
var csvWrite = require("../library/csv.lib");

var trainListArray = [];



var userFileUploadOBJ = {
    getllUserUpload: function (req, res) {
        var options = {
            perPage: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) || 1,
            order: req.query.order || 'originalFileName'
        };

        var query = userFileUploadModel.find({}, { fileName: 2, extension: 2, fileType: 3, originalFileName: 4, uploadedBy: 5, isProcessed: 6, status: 7, message: 8 }).sort('fileName');
        query.paginate(options, function (err, results) {
            if (err) throw err;
            return res.json(results);
        });

    },



    processUserUpload: function (req, res) {

        var query = userFileUploadModel.find({ fileName: req.params.fname });
        query.then(function (res) {
            processToTrain(res);

        }, function (err) {

        });

        return res.json("ok");
    },

    saveUserFileUpload: function (req, res) {
        if (!req.files)
            return res.status(400).json({
                "status": false,
                "message": "There is no file Uploaded",
                "code": 400
            });


        var uploadOBJ = new userFileUploadModel();
        uploadOBJ.data = req.files.file.data,
            uploadOBJ.fileName = removeExtension(req.files.file.name),
            uploadOBJ.fileType = req.files.file.mimetype,
            uploadOBJ.extension = extension(req.files.file.name),
            uploadOBJ.originalFileName = req.files.file.name,
            uploadOBJ.uploadedBy = "santosh",

            uploadOBJ.message = 'User file has been uploaded ',
            uploadOBJ.save(function (err, results) {
                if (err) throw err;

                res.status(201);
                res.json({
                    "status": 200,
                    "message": "FIle Upload Successfully!!!!"
                })


            });


    }

}

function removeExtension(f) {
    return f.substr(0, f.lastIndexOf('.'));
}

function extension(f) {
    if (!f)
        return;
    var parts = f.split(".");
    var x = parts[0];
    var y = parts[1];
    return y;
}

function processToTrain(res) {


    try {
        var data = res[0]._doc.data;

        // var re = /\r\n|\n\r|\n|\r/g;
        // var rows = dd.replace(/\s/g,'')
        // // var rows = dd.replace(re," ").split("\n");
        // rows = dd.replace(/(?:\\[rn]|[\r\n])/g,"\n");
        // rows = rows.split("\n");
        // console.log(rows);

        data += '\n';
        var re = /\r\n|\n\r|\n|\r/g;
        var rows = data.replace(re, "\n").split("\n");


        for (var i = 1; i < rows.length; i++) {
            var rowdata = rows[i].split(",");
            //  var trainNo = parseInt(rowdata[0]);
            var trainNo = rowdata[0];
            // var stopNo = parseInt(rowdata[1]);
            var stopNo = rowdata[1];
            var code = rowdata[2];
            // var dayofJourney = parseInt(rowdata[3]);
            var dayofJourney = rowdata[3];
            var arrivalTime = rowdata[4];
            var departureTime = rowdata[5];
            // var distance = parseInt(rowdata[6]);
            var distance = rowdata[6];
            var locotype = rowdata[7];
            //    pustToTrainArray(trainNo, stopNo, code, dayofJourney, arrivalTime, departureTime, distance, locotype);

            /// write to csv

            csvWrite.writeToCSV({
                trainNo: trainNo,
                stopNo: stopNo,
                stationCode: code,
                dayOfJourney: dayofJourney,
                arrivalTime: arrivalTime,
                departureTime: departureTime,
                distance: distance,
                locoType: locotype
            }, 'locotype.csv');

            /// write to DB
            //  trainstationModel.insertMany(trainListArray, function (err, results) {
            //     if (err) console.log (err);
            //     console.log("saved Successfully");
            // })
        }

    } catch (e) {
        console.log(e)
    }



}

function pustToTrainArray(trainNo, stopNo, code, dayOfJourney, arrivalTime, departureTime, distance, locoType) {
    trainListArray.push({
        trainNo: trainNo,
        stopNo: stopNo,
        stationCode: code,
        dayOfJourney: dayOfJourney,
        arrivalTime: arrivalTime,
        departureTime: departureTime,
        distance: distance,
        locoType: locoType
    });


}


module.exports = userFileUploadOBJ;
