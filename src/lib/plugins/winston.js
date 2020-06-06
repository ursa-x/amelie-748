/* eslint one-var: "off" */
import path from 'path';
import {
	createLogger,
	format,
	transports
} from 'winston';
import { upperCase } from 'voca';
import { LOGGER } from '../settings/general';

const {
		combine,
		timestamp: timestampFormat,
		printf
	} = format,
	srcDir = path.dirname(require.main.filename || process.mainModule.filename),
	logDir = `${srcDir}/../../logs`;

// eslint-disable-next-line object-curly-newline, no-unused-vars, arrow-body-style
const pretty = printf(({ level, message, label, timestamp }) => {
	return `[${timestamp}] [${upperCase(level)}] ${message}`;
});

const Logger = createLogger({
	level: 'info',
	format: combine(
		timestampFormat(),
		pretty
	),
	transports: new transports.File({
		dirname: logDir,
		filename: LOGGER.FILE.NAME,
		maxsize: LOGGER.FILE.MAX_SIZE,
		maxFiles: LOGGER.MAX_FILES
	})
});

export default Logger;
