var express = require('express');
var router = express.Router();
var userUploadModel = require("../models/userUpload.model")
var Promise = require("bluebird");
require('mongoose-query-paginate');
var fs = require('fs');




var userUploadOBJ = {
    getllUpload: function (req, res) {
        var options = {
            perPage: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) || 1,
            order: req.query.order || 'originalFileName'
        };
        var query = userUploadModel.find({ "markDelete": false }).sort('originalFileName');
        query.paginate(options, function (err, results) {
            if (err) throw new Error("Error in UserPlan");
            else {
                return res.json(results);
            }
        });
    },

    findByfilename: function (req, res) {
        var name = req.query.name;
        var query = userUploadModel.find({ "filename": new RegExp('^' + name + '$', "i") });
        query.exec(function (err, results) {
            if (err) return console.log(err);
            return res.json(results);
        });

    },

    saveUpload: function (req, res) {
        fileName = req.file.originalname;
        console.log(fileName);
        var file = __dirname + "/" + req.file.name;
        console.log("File Path : " + req.file.path);
        var filePath = req.file.path;

        var userUploadModelOBJ = new userUploadModel();

        fs.readFile(req.file.path, function (err, data) {


            userUploadModelOBJ.img.data = data;
            userUploadModelOBJ.img.contentType = 'image/png';
            userUploadModelOBJ.fileType = 'image/png',
                userUploadModelOBJ.originalFileName = fileName,
                userUploadModelOBJ.filename = removeExtension(fileName),
                userUploadModelOBJ.uploadedBy = "SANTOSH",
                userUploadModelOBJ.message = "SUCCESSFULLY UPLOADED",
                userUploadModelOBJ.save(function (err, results) {
                    if (err) throw err;

                    res.status(201);
                    res.json({
                        "status": 200,
                        "message": "FIle Upload Successfully!!!!"
                    })


                });

        })
    }

    // updateUser: function (req, res) {
    //     return new Promise(function (resolve, reject) {
    //         userUploadModel.findOneAndUpdate({ email: req.query.email }, { $set: { email: "santosh.citech@gmail.com" } }, { new: true }, function (err, doc) {
    //             if (err) {
    //                 reject("Something wrong when updating data!");
    //             }
    //             resolve(res.json({
    //                 message: "Update successfully !!!!"
    //             }))
    //         });
    //     });
    // },

    // deleteUser: function (req, res) {
    //     return new Promise(function (resolve, reject) {
    //         userUploadModel.remove({ email: "admin" }, function (err, doc) {
    //             if (err) {
    //                 reject("Something wrong when updating data!");
    //             }
    //             resolve(res.json({
    //                 message: "delete User successfully !!!!"
    //             }))
    //         });
    //     });
    // },







}

function removeExtension(f) {
    return f.substr(0, f.lastIndexOf('.'));
}


module.exports = userUploadOBJ;
