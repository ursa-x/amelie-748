import { Client } from 'klasa';
import { checkEnvironment } from './lib/util/general';
import secret from './lib/secrets.json';
import config from './lib/config.json';

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
