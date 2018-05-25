var express = require('express');
var router = express.Router();
var userFileUploadModel = require("../models/userFileUpload.model")
var trainModel = require("../models/train.model")
var Promise = require("bluebird");
require('mongoose-query-paginate');
var fs = require('fs');

var timeCALCULATOR = require("../library/timeCalculator.lib");

var trainsArray = [];



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
        var trainName = null;
        var fromStation = null;
        var toStation = null;
        var trainType = null;



        data += '\n';
        var re = /\r\n|\n\r|\n|\r/g;
        var rows = data.replace(re, "\n").split("\n");
        for (var i = 1; i < rows.length - 1; i++) {
            var rowdata = rows[i].split(",");
            trainNo = rowdata[0];
            trainName = rowdata[1];

            fromStation = rowdata[2];
            toStation = rowdata[3];
            trainType = rowdata[11];


            var runningDays = [];
            var nCount = 0;
            for (var j = 0; j < 7; j++) {
                var runningDay = rowdata[4 + j];
                if (runningDay != "") {
                    runningDays.push(j);

                }

            }


            //arrivalTimeMinutes = timeCALCULATOR.convertDateTimeObjToNumber({ nday: arrivalDay, stime: arrivalTime });
            //departureTimeMinutes = timeCALCULATOR.convertDateTimeObjToNumber({ nday: departureDay, stime: departureTime });
            pushToTrainArray(trainNo, trainName, fromStation, toStation, runningDays, trainType, "");


        }
        /// save to DB
        try {
            trainModel.insertMany(trainsArray, function (err, results) {
                if (err) console.log(err);
                console.log("saved Successfully");
            });
        } catch (exp) {
            throw new Error("Error Uploading data in DB : processTrainsToDB()" + exp);
        }
    } catch (exp) {
        throw new Error("Error in processTrainsToDB()" + exp);
    }

}

function pushToTrainArray(trainNo, trainName, fromStation, toStation, runningDays, trainType, locoType) {
    trainsArray.push({
        trainNo: trainNo,
        trainName: trainName,
        fromStation: fromStation,
        toStation: toStation,
        runningDays: runningDays,
        trainType: trainType,
        locoType: locoType

    });


}



