const { Client } = require('klasa');
const { Collection } = require('discord.js');
const { commandRemover, checkEnvironment } = require('./utilities/general-util');
const config = require('./config.json');

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
}).login(config.token);
