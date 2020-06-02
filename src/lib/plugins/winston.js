import {
	createLogger,
	format,
	transports
} from 'winston';
import path from 'path';
import { LOGGER } from '../settings/general';

const {
		combine,
		timestamp,
		prettyPrint
	} = format,
	srcDir = path.dirname(require.main.filename || process.mainModule.filename),
	logDir = `${srcDir}/../../logs`;

// eslint-disable-next-line one-var
const Logger = createLogger({
	level: 'info',
	format: combine(
		timestamp(),
		prettyPrint()
	),
	transports:
		new transports.File({
			dirname: logDir,
			filename: LOGGER.FILE.NAME,
			maxsize: LOGGER.FILE.MAX_SIZE,
			maxFiles: LOGGER.MAX_FILES
		})
});

export default Logger;
