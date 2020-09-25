/* eslint one-var: "off" */

// eslint-disable-next-line import/no-unresolved
import { author } from '../../../../config/common.properties.json';
// eslint-disable-next-line import/no-unresolved
import * as appProperties from '../../../../config/properties.json';
import { BOT } from '../../settings/general';
import * as URL from '../../settings/url';
import RANDOM_EVENTS from './constants';

// Helpers
const randomEventsAsString = () => RANDOM_EVENTS.join(', ');

// String literals
const LABEL = {
	// Common
	BIO: 'Bio',
	PREFIX: 'Prefix',
	VERSION: 'Version',
	CREDITS: 'Credits',
	USAGE: 'Usage',
	MORE: 'More',
	NEEDS_PERMISSIONS: 'Needs Permissions',
	CHARACTER_BY: 'Character By',
	DAY: 'Day',
	STATE: 'State',
	REGION: 'Region',
	NEAR_BY: 'Near By',
	COLLECTIBLES: 'Collectibles',
	GENERAL: 'General',
	ROLE: 'Role',
	EVENT: 'Event',
	OTHER_TIMES: 'Other Times',

	// Command
	NAZAR: 'nazar'
};

const GT = {
	MONSIEURECHO: '@MonsieurEcho'
};

const MESSAGE = {
	// Common
	EMPTY_TITLE: '',
	EMPTY_DESC: '',
	EMPTY_FOOTER: '',

	// Command
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

	// Madam Nazar
	NAZAR_DESC: 'Find useful Collector role info from Madam Nazar.',
	NAZAR_WYA_TITLE: 'Where is Madam Nazar?',
	NAZAR_WYA_DESC: (state) => `She's set up shop at **${state}** today.`,
	NAZAR_WYA_LOADING_TITLE: 'Searching...',
	NAZAR_WYA_LOADING_DESC: ':map: Looking for Madam Nazar...',
	NAZAR_SETS_TITLE: 'Madam Nazar\'s Weekly Sets',
	NAZAR_SETS_DESC: 'She is after one of these sets every week. Collector\'s take note.',
	NAZAR_SET_DESC: 'Deliver this set to Madam Nazar, when she\'s looking for it, to earn $ and XP.',
	NAZAR_SET_CURRENT_DESC: 'Find and deliver the items to Madam Nazar this week to earn $ and XP.',

	// Sally Nash
	SALLY_DESC: 'Find useful info on Free Roam events from Sally Nash.',
	SALLY_NEXT_EVENTS_TITLE: ':hourglass: Upcoming events',
	SALLY_NEXT_EVENTS_DESC: 'These are next set of free roam events. '
		+ 'Hands on your holster!',
	SALLY_NEXT_GENERAL_EVENT_DETAIL: (
		eventTime,
		eventName,
		timeDiff
	) => `**${eventName}**`
		+ `\nStarts ${timeDiff}`
		+ `\n\`${eventTime} GMT\``,
	SALLY_NEXT_ROLE_EVENT_DETAIL: (
		eventTime,
		eventName,
		eventRole,
		timeDiff
	) => `**${eventName}** \`${eventRole}\``
		+ `\nStarts ${timeDiff}`
		+ `\n\`${eventTime} GMT\``,
	SALLY_EVENTS_TITLE: ':calendar_spiral: Free roam event schedule',
	SALLY_GENERAL_EVENTS_TITLE: ':calendar_spiral: General event schedule',
	SALLY_ROLE_EVENTS_TITLE: ':calendar_spiral: Role event schedule',
	SALLY_EVENTS_DESC: 'Here is a list of free roam events you can '
		+ 'participate in each day, for gold, $ and XP.'
		+ '\n\n*All times are in GMT*.',
	SALLY_RANDOM_EVENT_NOTE: `*Also, \`Random\` events include ${randomEventsAsString()}*`,
	SALLY_WHEN_TITLE: ':bellhop: Free roam event details',
	SALLY_WHEN_DESC: 'Aight\' here\'s what I can tell you about the event that you are looking for...',

	// Error
	ERROR_GENERAL_REPLY: 'Sorry I don\'t understand',

	ERROR_NAZAR_WYA: '',
	ERROR_NAZAR_WEEKLY_TITLE: 'Couldn\'t find what you\'re looking for!',
	ERROR_NAZAR_WEEKLY_DESC: 'Ugh looks like Nazar won\'t let me in on the set she seeks this week. '
		+ `Check the [Red Dead Online Collector's Map](${URL.COLLECTOR_MAP}) for more information.`,

	ERROR_SALLY_WHEN: 'Couldn\'t find the event that you are looking for partner! :neutral_face:'
		+ `\n\n\`${appProperties.bot.prefix}sally events\` will give you the `
		+ 'complete schedule for Red Dead Online events.'
};

// Package all string literals
const COMMANDS = {
	LABEL,
	MESSAGE,
	GT
};

export default COMMANDS;
