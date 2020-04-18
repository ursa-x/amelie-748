/* eslint-disable */

/* FIX: Uses code from klasa.js 0.2.0 or so. Needs update to klasa.js 0.5.0-dev. */
const { Command } = require('klasa');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			name: 'avatar',
			enabled: true,
			runIn: ['text'],
			requiredPermissions: ['ATTACH_FILES'],
			description: "Fetch a user's avatar!",
			usage: '[user:usersearch]'
		});
	}

	async run(msg, [user]) {
		if (user === null) {
			return;
		}
		msg.channel.send('', {files: [user.displayAvatarURL()]});
	}
};
