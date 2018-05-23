"use strict";
var convertDateTimeObjToNumber = function(dateTimeObj,target){
    if(typeof dateTimeObj !== 'object' || dateTimeObj==null){
        //throw new IllegalArgumentException();
        var NameError = createErrorType('NameError', function (name, invalidChar) {
            this.message = 'The name ' + name + ' may not contain ' + invalidChar;
          });
    }

}




var timeCalculator = {
    convertDateTimeObjToNumber: convertDateTimeObjToNumber,
    // convertNumberToDateTimeObj: convertNumberToDateTimeObj,
    // addDateTimeObj: addDateTimeObj,
    // diffDateTimeObj: diffDateTimeObj
}

module.exports = timeCalculator;