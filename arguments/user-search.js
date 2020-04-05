const { Argument, util: { regExpEsc } } = require("klasa");
const { ID: REGEX_ID } = require('./../settings/general-settings');

/* Possible user detection:
 * <@!679196603134902283> (Mention)
 * 679196603134902283 (User ID)
 * Cliftos (Username)
 * Gotzey (Guild nickname)
 */

module.exports = class extends Argument {
	constructor(...args) {
		super(...args, {aliases: ["usersearch"]});
	}

	async run(arg, possible, msg) {
		let results = [];

		if (arg === undefined) {
			return msg.author;
		} else if (REGEX_ID.test(arg)) {
			let something = this.client.users.get(/(\d{17,21})/.exec(arg)[0]);
			return something;
		}

		if (msg.guild) {
			let regex = new RegExp(regExpEsc(arg), "i");
			results = msg.guild.members.filter(m => regex.test(m.user.username));
		}

		if (results.size === 0) {
			msg.channel.send(this.client.speech(msg, ["func-system", "usersearch"]));
			return null;
		}

		return this.client.users.get(results.keys().next().value);
	}
};
