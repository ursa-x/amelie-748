const { createLogger, format, transports } = require('winston');
const path = require('path');
var basePath = path.dirname(require.main.filename || process.mainModule.filename);
const logDirname = basePath + '/logs';
const logFilename = 'application.log';
const { combine, timestamp, prettyPrint } = format;
var fs = require( 'fs' );
if ( !fs.existsSync( logDirname ) ) {
   fs.mkdirSync( logDirname );
}

module.exports.Logger = createLogger({
  level: 'info',
  format: combine(      
      timestamp(),
      prettyPrint()
    ),
  transports:     
    new transports.File({ dirname: logDirname,filename: logFilename })  
});