'use strict';

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dboOBJ;

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    dboOBJ = db.db("smartwebschool");
    var myOBJ = { name: "Company Inc", address: "Highway 37" };
    dboOBJ.collection("customers").insertOne(myOBJ, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});

module.exports = dboOBJ;