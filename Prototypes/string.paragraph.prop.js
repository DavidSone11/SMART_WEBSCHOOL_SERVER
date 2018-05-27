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
            var paraCount = 0;
            fs.readFile(path + fname, function (err, data) {
                if (err) throw new Error("Error in Reading data :" + err);
                s += data.toString('utf8');
                var rows = s.split("\n");
                for (var row_num = 0; row_num < rows.length - 1; row_num++) {
                    console.log(rows[row_num]);
                    if (rows[row_num].indexOf(".") == -1) {
                        paraCount++;
                    }
                }
                console.log("No of Para :" + paraCount);
            });
        } catch (exp) {
            throw new Error("Error in Reading File :" + e);
        }
    }

    function vowel_count(str1) {
        var vowel_list = 'aeiouAEIOU';
        var vcount = 0;
        for (var x = 0; x < str1.length; x++) {
            if (vowel_list.indexOf(str1[x]) !== -1) {
                vcount += 1;
            }

        }
        return vcount;
    }
    console.log(vowel_count("The quick brown fox"));

    readFile("./UploadCSV/", "Readme.txt");

}());


