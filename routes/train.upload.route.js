var express = require('express');
var router = express.Router();
var userFileUploadModel = require("../models/userFileUpload.model")
var trainModel = require("../models/train.model")
var Promise = require("bluebird");
require('mongoose-query-paginate');
var fs = require('fs');

var timeCALCULATOR = require("../library/timeCalculator.lib");

var trainListArray = [];



module.exports = {
    getTrainUpload: function (req, res) {
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



    processTrainUpload: function (req, res) {

        var query = userFileUploadModel.find({ fileName: req.params.fname });
        query.then(function (res) {
            processTrainsToDB(res);

        }, function (err) {

        });

        return res.json("ok");
    },

    saveTrainUpload: function (req, res) {
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

function processTrainsToDB(res) {


    try {
        var data = res[0]._doc.data;

        // var re = /\r\n|\n\r|\n|\r/g;
        // var rows = dd.replace(/\s/g,'')
        // // var rows = dd.replace(re," ").split("\n");
        // rows = dd.replace(/(?:\\[rn]|[\r\n])/g,"\n");
        // rows = rows.split("\n");
        // console.log(rows);

        var trainNo = 0;
        var stopNo = 0;
        var dayofJourney = 0;
        var distance = 0;
        var arrivalTimeMinutes = 0;
        var departureTimeMinutes = 0;

        data += '\n';
        var re = /\r\n|\n\r|\n|\r/g;
        var rows = data.replace(re, "\n").split("\n");
        for (var i = 1; i < rows.length-1; i++) {
            var rowdata = rows[i].split(",");
            trainNo = rowdata[0];
            stopNo = rowdata[1];

            var code = rowdata[2];
            dayofJourney = rowdata[3];
            var arrivalDay = dayofJourney - 1;
            var arrivalTime = rowdata[4];
            var departureTime = rowdata[5];
            var departureDay = arrivalDay;
            distance = rowdata[6];
            var locotype = rowdata[7];

            arrivalTimeMinutes = timeCALCULATOR.convertDateTimeObjToNumber({ nday: arrivalDay, stime: arrivalTime });
            departureTimeMinutes = timeCALCULATOR.convertDateTimeObjToNumber({ nday: departureDay, stime: departureTime });
            pushToTrainArrayOBJ(trainNo, stopNo, code, dayofJourney, arrivalTime, arrivalTimeMinutes, departureTime, departureTimeMinutes, distance, locotype);


        }
        /// write to DB
        trainModel.insertMany(trainListArray, function (err, results) {
            if (err) console.log(err);
            console.log("saved Successfully");
        })


    } catch (e) {
        console.log(e)
    }



}

function pushToTrainArrayOBJ(trainNo, stopNo, code, dayOfJourney, arrivalTime, arrivalMinutes, departureTime, departureMinutes, distance, locoType) {
    trainListArray.push({
        trainNo: trainNo,
        stopNo: stopNo,
        stationCode: code,
        dayOfJourney: dayOfJourney,
        arrivalTime: arrivalTime,
        arrivalMinutes: arrivalMinutes,
        departureTime: departureTime,
        departureMinutes: departureMinutes,
        distance: distance,
        locoType: locoType
    });


}



