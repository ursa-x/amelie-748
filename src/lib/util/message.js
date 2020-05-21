/* eslint one-var: "off" */

import {
	titleCase,
	lowerCase
} from 'voca';
import { DELIMITER } from '../settings/general';

const MessageUtil = {
	getCommandLiteral(path, message) {
		const keys = path.split(DELIMITER.PERIOD);

		return keys.reduce(
			(previous, current) => (previous ? previous[current] : null),
			message.language.get('COMMANDS')
		);
	},

	getKlasaLiteral(path, args, message) {
		const params = (Array.isArray(args)) ? args : [];

		return message.language.get(path, ...params);
	},

	makeAttachmentString(imageName) {
		return `attachment://${imageName}`;
	},

	fixTitleCase(text) {
		return titleCase(lowerCase(text));
	}
};

module.exports = MessageUtil;
