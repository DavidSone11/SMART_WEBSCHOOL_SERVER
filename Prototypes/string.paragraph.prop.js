/*jshint multistr:true */

(function () {
    'use strict';
    var fs = require('fs');
    String.prototype.findParagraph = function findParagraph() {

        console.log(this);


    }

    "".findParagraph();
    var readFile = function (path, fname) {
        try {
            fs.readFile(path + fname, function (err, data) {
                if (err) throw new Error("Error in Reading data :" + err);
                var actualText = data.toString('utf8');
                console.log(actualText);

            });
        } catch (exp) {
            console.log(exp);
            throw new Error("Error in Reading File :" + e);
        }
    }

    readFile("./UploadCSV/", "Readme.txt");

}());


