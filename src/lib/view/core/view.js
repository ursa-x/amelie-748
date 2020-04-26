const {
	MessageEmbed,
	MessageAttachment
} = require('discord.js');
const { bot } = require('../../config');
const MessageUtil = require('../../util/message');

class CoreView {
	constructor(model) {
		this.model = model;
		this.footerText = this.model.originUser.username;

		this.getCommandLiteral = (key) => MessageUtil.getCommandLiteral(key, this.model.originMessage);
		this.embedOptions = {
			color: 'RANDOM',
			title: this.getTitleText(),
			author: this.getAuthor(),
			description: this.getDescriptionText(),
			timestamp: this.model.createdTime,
			footer: this.getFooter()
		};
		this.embed = new MessageEmbed(this.embedOptions);
	}

	getAuthor() {
		return {
			name: bot.name,
			icon_url: MessageUtil.makeAttachmentString(bot.iconFile)
		};
	}

	getFooter() {
		return {
			text: this.footerText || this.getCommandLiteral('MESSAGE.EMPTY_FOOTER')
		};
	}

	getTitleText() {
		return this.getCommandLiteral('MESSAGE.EMPTY_TITLE');
	}

	getDescriptionText() {
		return this.getCommandLiteral('MESSAGE.EMPTY_DESC');
	}

	get messageEmbed() {
		return this.embed;
	}

	get imageAttachment() {
		return new MessageAttachment(`./${bot.iconFolder}${bot.iconFile}`);
	}
}

module.exports = CoreView;
