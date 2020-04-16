const { Language } = require('klasa');
const COMMANDS = require('./../lib/messages/en-US/commands');

module.exports = class extends Language {
	constructor(...args) {
		super(...args, {
			name: 'en-US',
			enabled: true
		});

		this.loadLanguageLiterals(this);
	}

	loadLanguageLiterals(self) {
		self.language = { COMMANDS };
	}

	async init() {
		await super.init();
	}
};
