exports.DELIMITER = {
	SPACE: ' ',
	EMPTY_STRING: '',
	PERIOD: '.',
	UNDERSCORE: '_',
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
