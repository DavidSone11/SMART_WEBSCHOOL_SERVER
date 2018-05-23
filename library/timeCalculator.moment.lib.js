"use strict";
var moment = require('moment');
moment().format();


var convertDateTimeObjToNumber = function (dateTimeObj, target) {


    if (typeof dateTimeObj !== 'object' || dateTimeObj == null || typeof dateTimeObj === "undefined") {
        throw new Error("Not valid dateTimeObject passed to convertDateTimeObj()");
    }
    if (dateTimeObj.nday === null || typeof dateTimeObj.nday === "undefined") {
        throw new Error("Not valid dateTimeObject passed to convertDateTimeObj()");
    }
    if (dateTimeObj.stime === null || typeof dateTimeObj.stime === "undefined") {
        throw new Error("Not valid dateTimeObject passed to convertDateTimeObj()");
    }



    if (typeof dateTimeObj.stime === 'string' || dateTimeObj.stime instanceof String) {
        // Check correct time format and split into components
        dateTimeObj.stime = dateTimeObj.stime.match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [dateTimeObj.stime];
        if (dateTimeObj.stime.length > 0) {
            //var parts = dateTimeObj.stime[0].split(":");

            var startTime = '12:30';
            var durationInMinutes = 120 ||'120';
            var dy = 1 ||'1';
            
            return moment(startTime, 'HH:mm').add(durationInMinutes, 'minutes').format('HH:mm');
            // return endTime = moment(startTime, 'HH:mm').add(dy, 'days').format("mm"); 


        }
    }
}


exports.convertDateTimeObjToNumber = convertDateTimeObjToNumber;