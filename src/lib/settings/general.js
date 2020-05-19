const pkg = require('../../../package.json');
const { bot } = require('./persona');

exports.BOT = {
	NAME: bot.name,
	VERSION: pkg.version,
	NICKNAME: bot.nickName,
	TABLOID_NAME: bot.tabloidName
};

exports.DELIMITER = {
	SPACE: ' ',
	EMPTY_STRING: '',
	PERIOD: '.',
	UNDERSCORE: '_',
	DOUBLE_UNDERSCORE: '__',
	TILDE: '~',
	HYPHEN: '-',
	NEW_LINE: '\n'
};

exports.REGEX = {
	ID: /^((<@!)|())(\d{17,21})((>)|())$/,
	SET: /set|\s|_/gi
};

exports.EXCLUDES = {
	commandNames: [
		'Admin/load',
		'Admin/unload',
		'Admins/transfer',
		'General/Chat Bot Info/info',
		'General/Chat Bot Info/stats'
	]
};

exports.QUERY_TYPE = {
	ALL: 'all',
	SEARCH: 'search',
	DEFAULT: 'default'
};
