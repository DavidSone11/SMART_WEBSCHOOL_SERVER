"use strict";
var createErrorType = require('../exception/custom.exception');
var CustomError = require('../exception/custom-error');



var convertDateTimeObjToNumber = function (dateTimeObj, conversionUnits) {
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
            var tParts = dateTimeObj.stime[0].split(":");
            tParts[0] = parseInt(tParts[0]);
            tParts[1] = parseInt(tParts[1]);

            if ((tParts[0] > 23 || tParts[0] < 0) || (tParts[1] > 59 || tParts[1] < 0)) {
                throw new Error("Not valid dateTimeObj.time passed to convertDateTimeObj()");
            }
            if (typeof conversionUnits === "undefined") {
                conversionUnits = "";
            }

            // formula to convert day and time to number
            var mins = (dateTimeObj.nday * 1440) + (tParts[0] * 60) + tParts[1];

            var result = null;
            switch (conversionUnits) {
                case 'mins': case 'min': case 'minutes': case 'minute':
                    result = mins;
                    break;
                case 'hrs': case 'hr': case 'hours': case 'hour':
                    result = (mins / 60);
                    break;
                case 'days': case 'day':
                    result = Math.floor((mins / 1440));
                    break;
                default:
                    result = mins;
                    break;
            }
            return result;
        }
    }

}

var convertNumberToDateTimeObj = function (numberInMinutes, sType) {

    return "test"
}

var addDateTimeObj = function () {

}

var diffDateTimeObj = function () {

}
var convertMinsToHrsMins = function (minutes) {
    var h = Math.floor(minutes / 60);
    var m = minutes % 60;
    h = (h < 10) ? '0' + h : h;
    m = (m < 10) ? '0' + m : m;
    return h + ':' + m;

}

var toHourMinutes = function (min, sType) {
    var r = null;
    if(sType==null){
        sType = "";
    }
    sType = sType.toLowerCase();
    switch (sType) {
        case 'm1': case 'method1':
            var hh = Math.trunc(min / 60);
            var mm = min % 60;
            hh = (hh < 10) ? '0' + hh : hh;
            mm = (mm < 10) ? '0' + mm : mm;
            r = hh + ":" + mm;
            break;
        case 'm2': case 'method2':
            var mm = min % 60
            var hh = (min - mm) / 60
            hh = (hh < 10) ? '0' + hh : hh;
            mm = (mm < 10) ? '0' + mm : mm;
            r = hh + ":" + mm;
            break;
        default:
            r = "Please provide sType to the toHourMinutes()" 

    }

    return r;
}




exports.convertDateTimeObjToNumber = convertDateTimeObjToNumber;
exports.convertNumberToDateTimeObj = convertNumberToDateTimeObj;
exports.convertMinsToHrsMins = convertMinsToHrsMins;
exports.addDateTimeObj = addDateTimeObj;
exports.diffDateTimeObj = diffDateTimeObj;
exports.toHourMinutes = toHourMinutes;
