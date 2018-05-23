"use strict";
var createErrorType = require('../exception/custom.exception');
var CustomError = require('../exception/custom-error');
var convertDateTimeObjToNumber = function (dateTimeObj, target) {
    if (typeof dateTimeObj !== 'object' || dateTimeObj == null) {
        //throw new IllegalArgumentException();
        // var NameError = createErrorType('NameError', function (name, invalidChar) {
        //     this.message = 'The name ' + name + ' may not contain ' + invalidChar;
        //   });
        //callback(new CustomError(404, 'Not found!'));

        throw new CustomError(500, 'Server Error!');

    }

}




var timeCalculator = {
    convertDateTimeObjToNumber: convertDateTimeObjToNumber,
    // convertNumberToDateTimeObj: convertNumberToDateTimeObj,
    // addDateTimeObj: addDateTimeObj,
    // diffDateTimeObj: diffDateTimeObj
}

module.exports = timeCalculator;