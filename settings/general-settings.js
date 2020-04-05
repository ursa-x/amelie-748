exports.DEPENDENCIES = {

	nodeJs: {
		packageName: 'node.js',
		minVersion: '10.0.0'
	},

	discordJs: {
		packageName: 'discord.js',
		minVersion: '12.1.1'
	},

	klasaJs: {
		packageName: 'klasa.js',
		minVersion: '0.5.0-dev'
	},
};

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

