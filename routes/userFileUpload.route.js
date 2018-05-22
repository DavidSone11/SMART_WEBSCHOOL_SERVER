var express = require('express');
var router = express.Router();
var userFileUploadModel = require("../models/userFileUpload.model")
var Promise = require("bluebird");
require('mongoose-query-paginate');
var fs = require('fs');

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
    var d = res[0]._doc.data;
    var dd = d.replace(/(\r\n|\n|\r)/gm, " ");
    var cc = dd.split(",");
    for (var i = 0; i < cc.length; i++) {
        var trainNo = cc[11];
        pustToTrainArray(cc[11],cc[12],cc[13],cc[14],cc[15],cc[16],cc[17],cc[18]);
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
    })
}


module.exports = userFileUploadOBJ;
