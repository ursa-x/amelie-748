exports.REGEX = {
	ID: /^((<@!)|())(\d{17,21})((>)|())$/
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
