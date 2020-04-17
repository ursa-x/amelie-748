const KEY_DELIMITER = '.';

const MessageUtil = {
	getCommandLiteral(path, message) {
		const keys = path.split(KEY_DELIMITER);

		return keys.reduce((previous, current) => {
			return previous ? previous[current] : null;
		}, message.language.get('COMMANDS'));
	},

	makeAttachmentString(imageName) {
		return `attachment://${imageName}`;
	}
};

module.exports = MessageUtil;
