/*jshint multistr:true */

(function () {
    'use strict';
    var fs = require('fs');
    String.prototype.findParagraph = function findParagraph() {

        console.log(this);


    }

    //"".findParagraph();
    var readFile = function (path, fname) {
        try {
            var s = "";
            fs.readFile(path + fname, function (err, data) {
                if (err) throw new Error("Error in Reading data :" + err);
                 s += data.toString('utf8');
                 var rows = s.split("\n");
                 for (var row_num  = 0; row_num  < rows.length - 1; row_num++){
                    console.log(lines[row_num]);
                 }
            });
        } catch (exp) {
            throw new Error("Error in Reading File :" + e);
        }
    }

    readFile("./UploadCSV/", "Readme.txt");

}());


