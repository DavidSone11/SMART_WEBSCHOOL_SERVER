'use strict';

var util = require('util');

function CustomError(code, message) {
    Error.captureStackTrace(this, CustomError);
    this.name = CustomError.name;
    this.code = code;
    this.message = message;
}

util.inherits(CustomError, Error);

module.exports = CustomError;