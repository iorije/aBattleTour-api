'use strict';

//their modules
var winston = require("winston");
var path = require("path");


var logDate = function(){
    var date = new Date();
    var day = date.getDate().toString();
    var month = (date.getMonth() + 1).toString();
    var year = date.getFullYear().toString().substr(2, 2);
    
    if (month.length == 1){
        month = '0' + month;
    }
    
    return year + month + day;
}

module.exports.logDate = logDate();

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: path.resolve(__dirname + '/../logs/' + logDate() + '.log') })
    ]
});

module.exports = logger;


// logging levels
// ********************
// logger.error('log');
// logger.warn('log');
// logger.info('log');