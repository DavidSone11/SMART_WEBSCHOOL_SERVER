"use strict";
var createErrorType = require('../exception/custom.exception');
var CustomError = require('../exception/custom-error');
var convertDateTimeObjToNumber = function (dateTimeObj, target) {

    
        if (typeof dateTimeObj !== 'object' || dateTimeObj == null ||typeof dateTimeObj === "undefined") {
            throw new Error("Not valid dateTimeObject passed to convertDateTimeObj()");
        }
        if(dateTimeObj.nday !==null || typeof dateTimeObj.nday ==="undefined"){
            throw new Error("Not valid dateTimeObject passed to convertDateTimeObj()");
        }
        if(dateTimeObj.stime !==null || typeof dateTimeObj.stime ==="undefined"){
            throw new Error("Not valid dateTimeObject passed to convertDateTimeObj()");
        }



        if (typeof dateTimeObj.stime === 'string' || dateTimeObj.stime instanceof String){
            console.log(" string ");
        }else{
            console.log("not string ");
        }
        
    


}




var timeCalculator = {
    convertDateTimeObjToNumber: convertDateTimeObjToNumber,
    // convertNumberToDateTimeObj: convertNumberToDateTimeObj,
    // addDateTimeObj: addDateTimeObj,
    // diffDateTimeObj: diffDateTimeObj
}

module.exports = timeCalculator;