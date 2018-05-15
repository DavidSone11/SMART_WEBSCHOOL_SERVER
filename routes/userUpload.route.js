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


    saveUpload: function (req, res) {

         console.log("DSDASD"+req);
       
    },

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


module.exports = userUploadOBJ;
