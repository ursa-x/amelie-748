/* eslint one-var: "off" */

const LABEL = {
	/* Common */
	DAY: 'Day',
	STATE: 'State',
	REGION: 'Region',
	NEAR_BY: 'Near By',

	/* Command */
	NAZAR: 'nazar'
};

const MESSAGE = {
	/* Common */

	/* Commands */
	NAZAR_DESC: 'Find useful Collector role info from Madam Nazar.',
	NAZAR_WYA_TITLE: 'Where is Madam Nazar?',
	NAZAR_WYA_DESC: (state) => `She's set up shop at **${state}** today.`
};


const COMMANDS = {
	LABEL,
	MESSAGE
};

module.exports = COMMANDS;
