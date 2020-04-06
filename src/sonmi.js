const { Client } = require('klasa');
const { Collection } = require('discord.js');
const { checkEnvironment } = require('./lib/util/general');
const secret = require('./lib/secrets.json');
const config = require('./lib/config.json');

// Check if system is ready to run the bot
checkEnvironment();

new Client({
	fetchAllMembers: false,
	prefix: config.prefix,
	commandEditing: true,
	typing: true,
	readyMessage: (client) => {
		return `Successfully initialized. Ready to serve ${client.guilds.cache.size} guilds.`
	}
}).login(secret.token);
