var express = require('express');
var router = express.Router();
var userFileUpload = require("../models/userFileUpload.model")
var Promise = require("bluebird");
require('mongoose-query-paginate');
var fileUpload = require('express-fileupload');
var fs = require('fs');




var userFileUploadOBJ = {
    getllUpload: function (req, res) {
        var options = {
            perPage: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) || 1,
            order: req.query.order || 'originalFileName'
        };

    },

    findByfilename: function (req, res) {


    },

    saveUpload: function (req, res) {

    }

}

function removeExtension(f) {
    return f.substr(0, f.lastIndexOf('.'));
}


module.exports = userFileUploadOBJ;
