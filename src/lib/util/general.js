/* eslint-disable */

/* FIX: Uses code from klasa.js 0.2.0 or so. Needs update to klasa.js 0.5.0-dev. */

/* Exports all needed utilities for the client */
import { existsSync, unlinkSync} from 'fs';
import { version as DISCORDJS_VERSION } from 'discord.js';
import { version as  KLASAJS_VERSION } from 'klasa';
import SYSTEM_ERROR_MESSAGES from '../messages/error/general';
import APP_CONFIG from './../config.json';

/* Variables */
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

// Exports

/* Verifies the environment */
export const checkEnvironment = () => {
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
};

export const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

export const getDateAsString = (date) => {	
    var mm = date.getMonth() + 1;
    var dd = date.getDate();  
    return [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
			(dd>9 ? '' : '0') + dd,
			date.getHours(),
			date.getMinutes(),
			date.getSeconds()
           ].join('-');
}
