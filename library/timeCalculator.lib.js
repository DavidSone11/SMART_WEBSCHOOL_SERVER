"use strict";
var createErrorType = require('../exception/custom.exception');
var CustomError = require('../exception/custom-error');

/**
 *  A function to convert DateTime object to Number
 * @param {object} [dateTimeObj={day:1,time:'5:05'}]  
 * @param {string} [conversionUnits='mins']   - mins,hrs,days
 */

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



var convertNumberToDateTimeObj = function (number, type) {
    if (type == null) {
        type = "";
    }
    type = type.toLowerCase();

    if (number == null) {
        throw new Error("Number not sent to convertNumberToDateTimeObj()");
    }
    var day = -1;
    var hrs = -1;
    var mins = -1;
    switch (type) {
        case 'mins': case 'min': case 'minutes': case 'minute':
            day = Math.floor(number / 1440);
            number = number % 1440;
            hrs = Math.floor(number / 60);
            number = number % 60;
            mins = Math.floor(number);
            if (mins > 60) {
                throw new Error("Number not in correct type given");
            }
            break;
        case 'hrs': case 'hr': case 'hours': case 'hour':
            day = Math.floor(number / 1440);
            number = number % 1440;
            hrs = Math.floor(number / 60);
            if (hrs > 24) {
                throw new Error("Number not in correct type given");
            }
            break;
        case 'days': case 'day':
            day = Math.floor(number / 1440);
            if (day > 24) {
                throw new Error("Number not in correct type given");
            }
            break;
        default:
            day = Math.floor(number / 1440);
            number = number % 1440;
            hrs = Math.floor(number / 60);
            number = number % 60;
            mins = Math.floor(number);
            if (mins > 60) {
                throw new Error("Number not in correct type given");
            }
            break;
    }
    var result = {};
    if (day != -1) {
        result.days = day;
        result.day = day % 7;
    }
    if (hrs != -1 && mins == -1) {
        result.time = (hrs < 10) ? '0' : '' + hrs + ':00';
    }
    else if (hrs != -1 && mins != -1) {
        result.time = "";
        result.time += ((hrs < 10) ? '0' : '') + hrs.toString();
        result.time += ':' + ((mins < 10) ? '0' : '') + mins.toString();
    }
    return result;
}


var addDateTimeObj = function (dateTimeObj, number, operation, type) {
    if (type == null) {
        type = "";
    }
    if (operation == null) {
        operation = "+";
    }
    type = type.toLowerCase();
    operation = operation.toLowerCase();

    if (isNaN(number)) {
        throw new Error("Number is not proper in addDateTimeObj()");
    }
    var timeNo = null;
    var resultNo = null;
    var resultObj = null;
    timeNo = convertDateTimeObjToNumber(dateTimeObj, "min");
    switch (operation) {
        case '+': case 'plus': case 'add': case 'addition':
            resultNo = timeNo + number;
            // switch (type) {
            //     case 'mins': case 'min': case 'minutes': case 'minute':
            //         resultNo = (resultNo % 10080);
            //         break;
            //     case 'hrs': case 'hr': case 'hours': case 'hour':
            //         resultNo = (resultNo % 168);
            //         break;
            //     case 'days': case 'day':
            //         resultNo = (resultNo % 7);
            //         break;
            //     default:
            //         resultNo = (resultNo % 10080);
            //         break;
            // }
            break;
        case '-': case 'minus': case 'sub': case 'subtract': case 'subtraction':
            resultNo = timeNo - number;
            if (resultNo < 0) {
                switch (type) {
                    case 'mins': case 'min': case 'minutes': case 'minute':
                        var q = Math.floor(Math.abs(resultNo) / 10080);
                        q += 1;
                        resultNo = ((10080 * q) + resultNo);
                        break;
                    case 'hrs': case 'hr': case 'hours': case 'hour':
                        var q = Math.floor(Math.abs(resultNo) / 10080);
                        q += 1;
                        resultNo = ((168 * q) + resultNo);
                        break;
                    case 'days': case 'day':
                        var q = Math.floor(Math.abs(resultNo) / 10080);
                        q += 1;
                        resultNo = ((7 * q) + resultNo);
                        break;
                    default:
                        var q = Math.floor(Math.abs(resultNo) / 10080);
                        q += 1;
                        resultNo = ((10080 * q) + resultNo);
                        break;
                }
            }
            break;
        default:
            resultNo = timeNo + number;
            break;
    }
    resultObj = convertNumberToDateTimeObj(resultNo, "min");
    return resultObj;

}

var diffBetweenDateTimeOBJ = function (fromTimeOBJ, toTimeOBJ, units) {

    if (typeof fromTimeOBJ === "undefined" || fromTimeOBJ === 'null' || typeof fromTimeOBJ !== 'object' ) {
        throw new Error("Not valid fromObj passed to diffDateTimeObj()");
    }
    if (typeof toTimeOBJ === "undefined" || toTimeOBJ === 'null' || typeof toTimeOBJ !== 'object') {
        throw new Error("Not valid toTimeOBJ passed to diffDateTimeObj()");
    }
    if (fromTimeOBJ.nday === null || fromTimeOBJ.stime === null) {
        throw new Error("Not valid fromTimeOBJ passed to diffDateTimeObj()");
    }
    if (toTimeOBJ.nday === null || toTimeOBJ.stime === null) {
        throw new Error("Not valid toTimeOBJ passed to diffDateTimeObj()");
    }

    // check for null or empty
    if ((units == null) || (!units || 0 === units.length)) {
        units = "";
    }
    units = units.toLowerCase();

    var fromMins = convertDateTimeObjToNumber(fromTimeOBJ, units);
    var toMins = convertDateTimeObjToNumber(toTimeOBJ, units);
    // console.log(fromTimeOBJ);
    // console.log(toTimeOBJ);
    // console.log(units);
    var differ = (toMins-fromMins).toFixed(2);;


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
    if (sType == null) {
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

var minutesToHHMM = function (mins, isTwentyFour) {
    var h = Math.floor(mins / 60);
    var m = mins % 60;
    m = m < 10 ? '0' + m : m;

    if (isTwentyFour) {
        h = h < 10 ? '0' + h : h;
        return h + ':' + m;
    } else {
        var a = 'am';
        if (h >= 12) a = 'pm';
        if (h > 12) h = h - 12;
        return h + ':' + m + a;
    }
}


exports.convertDateTimeObjToNumber = convertDateTimeObjToNumber;
exports.convertNumberToDateTimeObj = convertNumberToDateTimeObj;
exports.convertMinsToHrsMins = convertMinsToHrsMins;
exports.addDateTimeObj = addDateTimeObj;
exports.diffBetweenDateTimeOBJ = diffBetweenDateTimeOBJ;
exports.toHourMinutes = toHourMinutes;
exports.minutesToHHMM = minutesToHHMM;
