/* eslint one-var: "off" */

const LABEL = {
	/* Common */
	DAY: 'Day',
	STATE: 'State',
	REGION: 'Region',
	NEAR_BY: 'Near By',
	COLLECTIBLES: 'Collectibles',

	/* Command */
	NAZAR: 'nazar'
};

const MESSAGE = {
	/* Common */
	EMPTY_TITLE: '',
	EMPTY_DESC: '',
	EMPTY_FOOTER: '',

	/* Commands */
	NAZAR_DESC: 'Find useful Collector role info from Madam Nazar.',
	NAZAR_WYA_TITLE: 'Where is Madam Nazar?',
	NAZAR_WYA_DESC: (state) => `She's set up shop at **${state}** today.`,
	NAZAR_WYA_LOADING_TITLE: 'Searching...',
	NAZAR_WYA_LOADING_DESC: ':map: Looking for Madam Nazar...',
	NAZAR_SETS_TITLE: 'Madam Nazar\'s Weekly Sets',
	NAZAR_SETS_DESC: 'She is after one of these sets every week. Collector\'s take note.',
	NAZAR_SET_DESC: 'Deliver this set to Madam Nazar, when she\'s looking for it, to earn $ and XP.',
	NAZAR_SET_CURRENT_DESC: 'Find and deliver the items to Madam Nazar this week to earn $ and XP.',

	/* Error */
	ERROR_GENERAL_REPLY: 'Sorry I don\'t understand',
	ERROR_NAZAR_WYA: ''
};


const COMMANDS = {
	LABEL,
	MESSAGE
};

module.exports = COMMANDS;
