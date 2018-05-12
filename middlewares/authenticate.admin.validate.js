/*jshint sub:true*/
' use strict';
var jwt = require('jsonwebtoken');
var cfg = require('../config/secret.config'); 
var secret = {superSecret: cfg.secretKey};
exports.authenticateAdmin = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['token'];
    var decAdmin = jwt.decode(token, { complete: true });
    if (token) {
        jwt.verify(token, cfg.secretKey, function(err, decoded) {
            if (err || !decAdmin.payload.username) {
                var custError = new Error('You are not authorized to perform this operation token has expired !!!!');
                custError.status = 403;
                return next(custError);
            } else {
                req.decoded = decoded;
               return next();
            }
        });
    } else {
        var custError = new Error('No token provided!');
        custError.status = 403;
        return next(custError);
    }
};