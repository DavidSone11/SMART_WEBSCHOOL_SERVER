"use strict";
var createErrorType = require('../exception/custom.exception');
var CustomError = require('../exception/custom-error');

/**
 * Adds time to a date. Modelled after MySQL DATE_ADD function.
 * Example: dateAdd(new Date(), 'minute', 30)  //returns 30 minutes from now.
 * https://stackoverflow.com/a/1214753/18511
 * 
 * @param date  Date to start with
 * @param interval  One of: year, quarter, month, week, day, hour, minute, second
 * @param units  Number of units of the given interval to add.
 */

var convertDateTimeObjToNumber = function (dateTimeObj, target) {

    
        if (typeof dateTimeObj !== 'object' || dateTimeObj == null ||typeof dateTimeObj === "undefined") {
            throw new Error("Not valid dateTimeObject passed to convertDateTimeObj()");
        }
        if(dateTimeObj.nday ===null || typeof dateTimeObj.nday ==="undefined"){
            throw new Error("Not valid dateTimeObject passed to convertDateTimeObj()");
        }
        if(dateTimeObj.stime ===null || typeof dateTimeObj.stime ==="undefined"){
            throw new Error("Not valid dateTimeObject passed to convertDateTimeObj()");
        }



        if (typeof dateTimeObj.stime === 'string' || dateTimeObj.stime instanceof String){
              // Check correct time format and split into components
            dateTimeObj.stime  = dateTimeObj.stime.match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [dateTimeObj.stime ];
            if (dateTimeObj.stime.length > 0) { 
                var timeParts = dateTimeObj.stime[0].split(":");
                timeParts[0] = parseInt(timeParts[0]);
                timeParts[1] = parseInt(timeParts[1]);
                
                var date = new Date();
                date = date.toLocaleTimeString();
                // formula to convert day and time to number




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