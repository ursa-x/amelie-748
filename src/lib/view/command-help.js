/* eslint max-classes-per-file: ["error", 2] */

import CoreView from './core/view';
import { DELIMITER } from '../settings/general';

class CommandHelpViewHelper extends CoreView {
	getAuthor() {
		return DELIMITER.EMPTY_STRING;
	}

	getTitleText() {
		const { prefix: serverPrefix } = this.model.originMessage.guildSettings;

		return `${serverPrefix}${this.model.name}`;
	}

	getDescriptionText() {
		return this.model.description;
	}

	getUsageField(inline = false) {
		const self = this,
			gcl = self.getCommandLiteral,
			usageText = `\`${self.model.usage}\``;

		return [
			gcl('LABEL.USAGE'),
			usageText,
			inline
		];
	}

	getExtendedHelpField(inline = false) {
		const self = this,
			gcl = self.getCommandLiteral,
			extendedHelpText = self.model.extendedHelp;

		return [
			gcl('LABEL.MORE'),
			extendedHelpText,
			inline
		];
	}

	hasExtendedHelp(extendedHelpText) {
		const { originMessage } = this.model,
			defaultMessage = originMessage.language.get('COMMAND_HELP_NO_EXTENDED');

		return extendedHelpText !== defaultMessage;
	}
}

class CommandHelpView extends CommandHelpViewHelper {
	get messageEmbed() {
		const self = this,
			usageField = this.getUsageField(),
			CommandHelpEmbed = self.embed
				.addField(...usageField);

		if (self.hasExtendedHelp(self.model.extendedHelp)) {
			const extendedHelpField = this.getExtendedHelpField();

			CommandHelpEmbed.addField(...extendedHelpField);
		}

		return CommandHelpEmbed;
	}
}

module.exports = CommandHelpView;
