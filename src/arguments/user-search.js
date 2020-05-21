/* eslint-disable */

/* FIX: Uses code from klasa.js 0.2.0 or so. Needs update to klasa.js 0.5.0-dev. */
import { Argument, util } from 'klasa';
import { REGEX } from './../lib/settings/general';

/* Possible user detection:
 * <@!679196603134902283> (Mention)
 * 679196603134902283 (User ID)
 * Cliftos (Username)
 * Gotzey (Guild nickname)
 */

const { regExpEsc } = util;

module.exports = class extends Argument {
	constructor(...args) {
		super(...args, {aliases: ['usersearch']});
	}

	getUID(completeUserID) {
		return `${/(\d{17,21})/.exec(completeUserID)[0]}`;
	}

	async run(arg, possible, msg) {
		let results = [];

		if (typeof arg === 'undefined') {
			return msg.author;
		} else if (REGEX.ID.test(arg)) {
			const userID = this.getUID(arg),
			person = this.client.users.cache.get(userID);

			return person;
		}

		if (msg.guild) {
			let regex = new RegExp(regExpEsc(arg), 'i');
			results = msg.guild.members.filter(m => regex.test(m.user.username));
		}

		if (results.size === 0) {
			msg.channel.send(this.client.speech(msg, ['func-system', 'usersearch']));
			return null;
		}

		return this.client.users.get(results.keys().next().value);
	}
};
