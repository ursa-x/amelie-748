import { createLogger, format, transports } from 'winston';
import path from 'path';
import { LOG_FILE_NAME, LOG_FILE_MAX_SIZE, LOG_MAX_FILES } from '../settings/general';

const { combine, timestamp, prettyPrint } = format,
	basePath = path.dirname(require.main.filename || process.mainModule.filename),
	logDirname = `${basePath}/../logs`,
	logFilename = LOG_FILE_NAME,
	Logger = createLogger({
		level: 'info',
		format: combine(
			timestamp(),
			prettyPrint()
		),
		transports:
		new transports.File({
			dirname: logDirname,
			filename: logFilename,
			maxsize: LOG_FILE_MAX_SIZE,
			maxFiles: LOG_MAX_FILES
		})
	});
export default Logger;
