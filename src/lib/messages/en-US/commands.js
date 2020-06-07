/* eslint one-var: "off" */

import { author } from '../../config.json';
import { BOT } from '../../settings/general';

const LABEL = {
	/* Common */
	BIO: 'Bio',
	PREFIX: 'Prefix',
	VERSION: 'Version',
	CREDITS: 'Credits',
	USAGE: 'Usage',
	MORE: 'More',
	CHARACTER_BY: 'Character By',
	DAY: 'Day',
	STATE: 'State',
	REGION: 'Region',
	NEAR_BY: 'Near By',
	COLLECTIBLES: 'Collectibles',
	GENERAL: 'General',
	ROLE: 'Role',

	/* Command */
	NAZAR: 'nazar'
};

const GT = {
	MONSIEURECHO: '@MonsieurEcho'
};

const MESSAGE = {
	/* Common */
	EMPTY_TITLE: '',
	EMPTY_DESC: '',
	EMPTY_FOOTER: '',

	/* Commands */
	HELP_TITLE: 'Hello, there! :wave:',
	HELP_DESC: (serverPrefix) => `To see what you may get out of a conversation, say \`${serverPrefix}help [word]\``,

	INFO_TITLE: '',
	INFO_DESC: '',
	INFO_AMELIE_QUOTE: `> *I'd like to remember that there’s a path for everyone.*\n> ~ ${BOT.NAME}`,
	INFO_AMELIE_BIO: `A lass too modern for 1898, the lively **${BOT.TABLOID_NAME}**, `
		+ 'is an orphan who learned to survive on the treacherous streets of Valentine.'
		+ '\n\nLittle does Marshal Davies know that the ghost in unsolved Case No. 1137, '
		+ 'that lifted *The Market Gardens of Saint Denis* and *Four Wapiti Women*, two coveted '
		+ `works of eccentric artist Charles Châtenay, was none other than ${BOT.NICKNAME}.`
		+ '\n\nApart from being the cleanest pair of gloves in the Wild West, this pretty cat burglar '
		+ 'is a notorious gunslinger. When she is not plotting her next perfect heist, '
		+ `${BOT.NICKNAME} is helping you out on here.`,
	INFO_HELP: (serverPrefix) => `To talk to ${BOT.NICKNAME}, type \`${serverPrefix}help\``,
	INFO_AMELIE_DEDICATE: 'To the lovely folks at **Dark Company 1899**.',
	INFO_AMELIE_CREATOR: `Made with :white_heart: by ${author.name}`,

	NAZAR_DESC: 'Find useful Collector role info from Madam Nazar.',
	NAZAR_WYA_TITLE: 'Where is Madam Nazar?',
	NAZAR_WYA_DESC: (state) => `She's set up shop at **${state}** today.`,
	NAZAR_WYA_LOADING_TITLE: 'Searching...',
	NAZAR_WYA_LOADING_DESC: ':map: Looking for Madam Nazar...',
	NAZAR_SETS_TITLE: 'Madam Nazar\'s Weekly Sets',
	NAZAR_SETS_DESC: 'She is after one of these sets every week. Collector\'s take note.',
	NAZAR_SET_DESC: 'Deliver this set to Madam Nazar, when she\'s looking for it, to earn $ and XP.',
	NAZAR_SET_CURRENT_DESC: 'Find and deliver the items to Madam Nazar this week to earn $ and XP.',

	SALLY_DESC: 'Find useful info on Free Roam events from Sally Nash.',
	SALLY_EVENTS_TITLE: 'Free roam event schedule',
	SALLY_EVENTS_DESC: 'Here is a list of free roam events you can '
		+ 'participate in each day, for gold, $ and XP.'
		+ '\n\n*All times are in GMT*.',
	SALLY_NEXT_EVENTS_TITLE: ':hourglass: Upcoming events',
	SALLY_NEXT_EVENTS_DESC: 'These are next set of free roam events. '
		+ 'Hands on your holster!',

	/* Error */
	ERROR_GENERAL_REPLY: 'Sorry I don\'t understand',
	ERROR_NAZAR_WYA: ''
};


const COMMANDS = {
	LABEL,
	MESSAGE,
	GT
};

export default COMMANDS;
