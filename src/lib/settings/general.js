/* eslint one-var: "off" */

import path from 'path';
import { bot } from './persona.json';

// eslint-disable-next-line import/no-dynamic-require
const pkg = require(path.resolve('package.json'));

export const BOT = {
	NAME: bot.name,
	VERSION: pkg.version,
	NICKNAME: bot.nickName,
	TABLOID_NAME: bot.tabloidName
};

export const DELIMITER = {
	SPACE: ' ',
	EMPTY_STRING: '',
	PERIOD: '.',
	UNDERSCORE: '_',
	DOUBLE_UNDERSCORE: '__',
	TILDE: '~',
	HYPHEN: '-',
	NEW_LINE: '\n'
};

export const REGEX = {
	ID: /^((<@!)|())(\d{17,21})((>)|())$/,
	SET: /set|\s|_/gi
};

export const QUERY_TYPE = {
	ALL: 'all',
	SEARCH: 'search',
	DEFAULT: 'default'
};

export const LOG_FILE_NAME = 'application.log';
export const LOG_FILE_MAX_SIZE = 1048576;
export const LOG_MAX_FILES = 10;
