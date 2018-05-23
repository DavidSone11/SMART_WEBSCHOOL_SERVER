var convertDateTimeObjToNumber = function(dateTimeObj,target){
    if(typeof dateTimeObj !== 'object' || dateTimeObj==null){
        throw new IllegalArgumentException();
    }

}




var timeCalculator = {
    convertDateTimeObjToNumber: convertDateTimeObjToNumber,
    // convertNumberToDateTimeObj: convertNumberToDateTimeObj,
    // addDateTimeObj: addDateTimeObj,
    // diffDateTimeObj: diffDateTimeObj
}

module.exports = timeCalculator;