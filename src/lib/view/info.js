/* eslint max-classes-per-file: ["error", 2] */

const CoreView = require('./core/view');
const {
	BOT,
	DELIMITER
} = require('../settings/general');

class InfoViewHelper extends CoreView {
	getServerPrefixField(inline = true) {
		const self = this,
			serverPrefix = self.model.originMessage.guildSettings.prefix,
			gcl = self.getCommandLiteral;

		return {
			name: gcl('LABEL.PREFIX'),
			value: `\`${serverPrefix}\``,
			inline
		};
	}

	getVersionField(inline = true) {
		const self = this,
			gcl = self.getCommandLiteral;

		return {
			name: gcl('LABEL.VERSION'),
			value: `${BOT.VERSION}`,
			inline
		};
	}

	getCharacterField(inline = true) {
		const self = this,
			gcl = self.getCommandLiteral;

		return {
			name: gcl('LABEL.CHARACTER_BY'),
			value: gcl('GT.MONSIEURECHO'),
			inline
		};
	}

	getCreditsField(inline = false) {
		const self = this,
			gcl = self.getCommandLiteral,
			dedication = gcl('MESSAGE.INFO_AMELIE_DEDICATE'),
			madeBy = gcl('MESSAGE.INFO_AMELIE_CREATOR'),
			credits = `${dedication}\n\n${madeBy}`;

		return [
			gcl('LABEL.CREDITS'),
			credits,
			inline
		];
	}

	getTitleText() {
		return DELIMITER.EMPTY_STRING;
	}

	getDescriptionText() {
		return `\n${this.writeBio()}`;
	}

	writeBio() {
		const gcl = this.getCommandLiteral,
			serverPrefix = this.model.originMessage.guildSettings.prefix,
			amelieQuote = gcl('MESSAGE.INFO_AMELIE_QUOTE'),
			amelieBio = gcl('MESSAGE.INFO_AMELIE_BIO'),
			helpText = gcl('MESSAGE.INFO_HELP')(serverPrefix);

		return `${amelieQuote}\n\n${amelieBio}\n\n${helpText}`;
	}
}

class InfoView extends InfoViewHelper {
	get messageEmbed() {
		const self = this,
			creditsField = this.getCreditsField(),
			InfoEmbed = self.embed
				.addFields([
					this.getServerPrefixField(),
					this.getVersionField(),
					this.getCharacterField()
				])
				.addField(...creditsField);

		return InfoEmbed;
	}
}

module.exports = InfoView;
