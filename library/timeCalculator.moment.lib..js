"use strict";
var moment = require('moment');
moment().format();
var createErrorType = require('../exception/custom.exception');
var CustomError = require('../exception/custom-error');
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

            const startTime = '12:30:00';
            const durationInMinutes = '120';

            const endTime = moment(startTime, 'HH:mm:ss').add(durationInMinutes, 'minutes').format('HH:mm');

        }
    }




}




var timeCalculator = {
    convertDateTimeObjToNumber: convertDateTimeObjToNumber,
    // convertNumberToDateTimeObj: convertNumberToDateTimeObj,
    // addDateTimeObj: addDateTimeObj,
    // diffDateTimeObj: diffDateTimeObj
}

module.exports = timeCalculator;