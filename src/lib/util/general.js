/* Exports all needed utilities for the client */
const { existsSync, unlinkSync} = require('fs');
const { version: DISCORDJS_VERSION } = require('discord.js');
const { version: KLASAJS_VERSION } = require('klasa');
const { EXCLUDES } = require('./../settings/general');
const { SYSTEM: SYSTEM_ERROR_MESSAGES } = require('./../messages/error/general');
const APP_CONFIG = require('./../config.json');

/* Variables */
const { commandNames: EXCLUDED_COMMAND_NAMES } = EXCLUDES;
const {
	nodeJs,
	discordJs,
	klasaJs
} = APP_CONFIG.coreDependencies;

/* Methods */
const getCommandPath = (commandName) => {
	return `${client.userBaseDirectory}/node_modules/klasa/src/commands/${commandName}.js`;
};

const getNodeVersion = () => {
	let nodeVersionParts = process.version.split('v')[1].split('.');

	return Number(`${nodeVersionParts[0]}.${nodeVersionParts[1]}`);
};

module.exports = {

	/* Removes unnecessary commands in the default Klasa framework */
	commandRemover: () => {
		for (const commandName in EXCLUDED_COMMAND_NAMES) {
			const commandPath = getCommandPath(commandName);

			if (existsSync(commandPath)) {
				unlinkSync(commandPath);
			}
		}
	},

	/* Verifies the environment */
	checkEnvironment: () => {
		let nodeVersion = getNodeVersion(),
			missingDependencies = [];

		if (nodeVersion < 10.0) {
			missingDependencies.push(
				SYSTEM_ERROR_MESSAGES.getPackageVersionErrorMessage(nodeJs.packageName, nodeJs.minVersion)
			);
		}

		if (DISCORDJS_VERSION !== discordJs.minVersion) {
			missingDependencies.push(
				SYSTEM_ERROR_MESSAGES.getPackageVersionErrorMessage(discordJs.packageName, discordJs.minVersion)
			);
		}

		if (KLASAJS_VERSION !== klasaJs.minVersion) {
			missingDependencies.push(
				SYSTEM_ERROR_MESSAGES.getPackageVersionErrorMessage(klasaJs.packageName, klasaJs.minVersion)
			);
		}

		if (missingDependencies.length > 0) {
			console.log(missingDependencies.join('\n'));
			process.exit();
		}
	}
};
