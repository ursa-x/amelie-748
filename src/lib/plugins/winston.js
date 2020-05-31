import { createLogger, format, transports } from 'winston';
import path from 'path';
import {LOG_FILE_NAME, LOG_FILE_MAX_SIZE, LOG_MAX_FILES } from '../settings/general'

const { combine, timestamp, prettyPrint } = format;

const basePath = path.dirname(require.main.filename || process.mainModule.filename);
const logDirname = basePath + '/../logs';
const logFilename = LOG_FILE_NAME;

module.exports.Logger = createLogger({
  level: 'info',
  format: combine(      
      timestamp(),
      prettyPrint()
    ),
  transports:     
    new transports.File({ dirname: logDirname, filename: logFilename , maxsize: LOG_FILE_MAX_SIZE, maxFiles : LOG_MAX_FILES })  
});
