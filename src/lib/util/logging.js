import { createLogger, format, transports } from 'winston';
import path from 'path';
import { getDateAsString } from './general';
import fs from 'fs';
import {LOG_FILE_NAME, LOG_FILE_MAX_SIZE } from '../settings/general'
const exec = require('child_process').exec;
const { combine, timestamp, prettyPrint } = format;

const basePath = path.dirname(require.main.filename || process.mainModule.filename);
const logDirname = basePath + '/logs';
const logArchiveRootDirname = basePath + '/logs_archive';
const logFilename = LOG_FILE_NAME;


if ( fs.existsSync( logDirname ) ) {    
    const logsArchiveDirName =  logArchiveRootDirname + '/' +   getDateAsString(new Date());
    fs.mkdirSync(logsArchiveDirName , { recursive: true });    
    exec('mv ' + logDirname + '/ ' + logsArchiveDirName, 
    function(err, stdout, stderr) {
        console.log('out:' + stdout);
        if(stderr) throw stderr;
        if(err) throw err;
    });
}
fs.mkdirSync( logDirname );

module.exports.Logger = createLogger({
  level: 'info',
  format: combine(      
      timestamp(),
      prettyPrint()
    ),
  transports:     
    new transports.File({ dirname: logDirname, filename: logFilename , maxsize: LOG_FILE_MAX_SIZE })  
});
