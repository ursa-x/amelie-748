const { Client } = require('klasa');
const { checkEnvironment } = require('./lib/util/general');
const secret = require('./lib/secrets.json');
const config = require('./lib/config.json');
const { Logger } = require('./lib/util/logging');

// Check if system is ready to run the bot
checkEnvironment();

var klasaClient = new Client({
	fetchAllMembers: false,
	prefix: config.prefix,
	commandEditing: true,
	commandLogging: true,	
	typing: true,	
	readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.cache.size} guilds.`
});

klasaClient.on('log', async (message) => {
	Logger.info(message);
});

klasaClient.login(secret.token);
