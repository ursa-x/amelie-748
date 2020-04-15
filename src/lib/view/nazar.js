const {MessageEmbed, MessageAttachment} = require('discord.js');

class LocationViewHelper {
	constructor(message, locationModel) {
		this.model = locationModel;
		this.footerText = message.author.name;
	}

	getAuthor() {
		return {
			name: 'Charlotte Balfour',
			icon_url: 'attachment://charlotte-balfour.png'
		};
	}

	getDayField(inline = true) {
		return {
			name: 'Day',
			value: this.model.currentDate,
			inline
		};
	}

	getRegionField(inline = true) {
		return {
			name: 'Region',
			value: this.model.region,
			inline
		}
	}

	getLandmarkField(inline = true) {
		return {
			name: 'Near By',
			value: this.getNearByText(),
			inline
		};
	}

	getMapField() {
		return {
			name: 'Map',
			value: 'Pinpointing the location in the world'
		};
	}

	getImage() {
		return {
			url: this.model.imageURL
		}
	}

	getFooter() {
		return {
			text: this.footerText
		};
	}

	getTitleText() {
		return 'Where is Madam Nazar?';
	}

	getDescriptionText() {
		return `She has set up shop at ${this.model.region}, ${this.model.state} today.`;
	}

	getNearByText() {
		return this.model.landmarks.join(', ');
	}
}

class LocationView extends LocationViewHelper {
	constructor(message, locationModel) {
		super(message, locationModel);
	}

	get messageEmbed() {
		return new MessageEmbed({
			color: 'RANDOM',
			title: this.getTitleText(),
			author: this.getAuthor(),
			description: this.getDescriptionText(),
			fields: [
				this.getDayField(),
				this.getMapField()
			],
			image: this.getImage(),
			timestamp: new Date(),
			footer: this.getFooter()
		});
	}

	get imageAttachment() {
		return new MessageAttachment('./assets/charlotte-balfour.png');
	}
};

module.exports = LocationView;
