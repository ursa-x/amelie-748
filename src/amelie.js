import { Client } from 'klasa';
import { checkEnvironment } from './lib/util/general';
import secret from './lib/secrets.json';
import config from './lib/config.json';
import ServiceStore from './lib/structures/service-store';
import {Logger} from './lib/util/logging';
// Check if system is ready to run the bot
checkEnvironment();
Logger.info('Init');

class BotClient extends Client {
	constructor(...args) {
		super(...args);

		// Register the 'Service' piece store
		this.services = new ServiceStore(this);
		this.registerStore(this.services);
	}
}

const Amelie = new BotClient({
	fetchAllMembers: false,
	prefix: config.prefix,
	commandEditing: true,
	commandLogging: true,
	consoleEvents: {
		log: true,
		error: true
	},
	typing: true,
	pieceDefaults: {
		services: {
			enabled: true
		}
	},
	disabledCorePieces: ['commands'],
	readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.cache.size} guilds.`
}).login(secret.token);

export default Amelie;
