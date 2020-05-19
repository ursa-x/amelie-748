const { Client } = require('klasa');
const { checkEnvironment } = require('./lib/util/general');
const secret = require('./lib/secrets.json');
const config = require('./lib/config.json');

// Check if system is ready to run the bot
checkEnvironment();

new Client({
	fetchAllMembers: false,
	prefix: config.prefix,
	commandEditing: true,
	commandLogging: true,
	consoleEvents: {
		log: true,
		error: true
	},
	typing: true,
	disabledCorePieces: ['commands'],
	readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.cache.size} guilds.`
}).login(secret.token);
