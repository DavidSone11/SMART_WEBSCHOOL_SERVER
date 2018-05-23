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
                var tParts = dateTimeObj.stime[0].split(":");
                tParts[0] = parseInt(tParts[0]);
                tParts[1] = parseInt(tParts[1]);

                if((tParts[0]>23 || tParts[0]<0) || (tParts[1]>59 || tParts[1]<0)){
                    console.log("Invalide date format");
                }
                
                var mins = (dateTimeObj.nday * 1440) + (tParts[0]*60) + tParts[1];
               
                // formula to convert day and time to number


                var ss = mins.toLocaleString();
                var ff= require("../Prototypes/trim.prop");
                ff.trimFun("lllll");

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