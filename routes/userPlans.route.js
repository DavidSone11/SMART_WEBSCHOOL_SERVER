var express = require('express');
var router = express.Router();
var userPlanModel = require("../models/userPlan.model")
var Promise = require("bluebird");
require('mongoose-query-paginate');
var fs = require('fs');




var users = {
    getPlanAllPlans: function (req, res) {
        var options = {
            perPage: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) || 1,
            order: req.query.order || 'userName'
        };
        var query = userPlanModel.find({ "markDelete": false }).sort('userName');
        query.paginate(options, function (err, results) {
            if (err) throw new Error("Error in User");
            else {
                return res.json(results);
            }
        });
    },


    savePlan: function (req, res) {

        var userOBJ = {
            userName: "admin",
            firstName: "adminR",
            lastName: "adminR",
            password: "admin123456",
            email: "admin@abc.com",
            email: "admin",
        }
        userPlanModel.create(userOBJ, function (err, results) {
            if (err) throw new Error("Error in Saving ");
            else {
                return res.json({
                    "message": "User has been saved !!!!",

                })
            }

        });
    },

    updateUser: function (req, res) {
        return new Promise(function (resolve, reject) {
            userPlanModel.findOneAndUpdate({ email: req.query.email }, { $set: { email: "santosh.citech@gmail.com" } }, { new: true }, function (err, doc) {
                if (err) {
                    reject("Something wrong when updating data!");
                }
                resolve(res.json({
                    message: "Update successfully !!!!"
                }))
            });
        });
    },

    deleteUser: function (req, res) {
        return new Promise(function (resolve, reject) {
            userPlanModel.remove({ email: "admin" }, function (err, doc) {
                if (err) {
                    reject("Something wrong when updating data!");
                }
                resolve(res.json({
                    message: "delete User successfully !!!!"
                }))
            });
        });
    },







}


module.exports = users;
