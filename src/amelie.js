import { Client } from 'klasa';
import { checkEnvironment } from './lib/util/general';
import secret from './lib/secrets.json';
import ServiceStore from './lib/structures/service-store';
import Logger from './lib/plugins/winston';

// load environment configurations
require('dotenv').config();

// Check if system is ready to run the bot
checkEnvironment();

class BotClient extends Client {
	constructor(...args) {
		super(...args);

		// Setup the logger
		this.initializeLogger();

		// Register the 'Service' piece store
		this.services = new ServiceStore(this);
		this.registerStore(this.services);
	}

	initializeLogger() {
		Logger.info('Initialized logger');
	}
}

const Amelie = new BotClient({
	fetchAllMembers: false,
	prefix: process.env.BOT_CONFIG_PREFIX,
	commandEditing: true,
	commandLogging: true,
	consoleEvents: {
		log: true,
		error: true
	},
	typing: true,
	pieceDefaults: {
		monitors: {
			ignoreBots: (!!process.env.BOT_CONFIG_IGNORE_BOTS)
		},
		// Custom piece defaults
		services: {
			enabled: true
		}
	},
	disabledCorePieces: ['commands'],
	readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.cache.size} guilds.`
}).login(secret.token);

export default Amelie;
