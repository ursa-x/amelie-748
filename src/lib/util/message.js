const {
	titleCase,
	lowerCase
} = require('voca');

const KEY_DELIMITER = '.';

const MessageUtil = {
	getCommandLiteral(path, message) {
		const keys = path.split(KEY_DELIMITER);

		return keys.reduce(
			(previous, current) => (previous ? previous[current] : null),
			message.language.get('COMMANDS')
		);
	},

	makeAttachmentString(imageName) {
		return `attachment://${imageName}`;
	},

	fixTitleCase(text) {
		return titleCase(lowerCase(text));
	}
};

module.exports = MessageUtil;
