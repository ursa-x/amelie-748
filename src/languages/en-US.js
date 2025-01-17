import { Language } from 'klasa';
import COMMANDS from '../lib/messages/en-US/commands';

export default class extends Language {
	constructor(...args) {
		super(...args, {
			name: 'en-US',
			enabled: true
		});

		this.loadLanguageLiterals();
	}

	loadLanguageLiterals() {
		this.language = { COMMANDS };
	}

	async init() {
		await super.init();
	}
}
