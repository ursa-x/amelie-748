/* eslint max-classes-per-file: ["error", 2] */

const CoreView = require('../core/view');

class LocationViewHelper extends CoreView {
	getDayField(inline = true) {
		const self = this;

		return {
			name: self.getCommandLiteral('LABEL.DAY'),
			value: self.model.currentDate,
			inline
		};
	}

	getStateField(inline = true) {
		const self = this;

		return {
			name: self.getCommandLiteral('LABEL.STATE'),
			value: self.model.state,
			inline
		};
	}

	getRegionField(inline = true) {
		const self = this;

		return {
			name: self.getCommandLiteral('LABEL.REGION'),
			value: self.model.region,
			inline
		};
	}

	getLandmarkField(inline = true) {
		const self = this,
			getNearByText = (obj) => obj.model.landmarks.join(', ');

		return {
			name: self.getCommandLiteral('LABEL.NEAR_BY'),
			value: getNearByText(self),
			inline
		};
	}

	getImage() {
		return {
			url: this.model.imageURL
		};
	}

	getFooter() {
		return {
			text: this.footerText
		};
	}

	getTitleText() {
		return this.getCommandLiteral('MESSAGE.NAZAR_WYA_TITLE');
	}

	getDescriptionText() {
		const commandDescription = this.getCommandLiteral('MESSAGE.NAZAR_WYA_DESC');

		return commandDescription(this.model.state);
	}
}

class LocationView extends LocationViewHelper {
	get messageEmbed() {
		const self = this,
			LocationViewEmbed = this.embed;

		return LocationViewEmbed
			.addFields([
				self.getRegionField(),
				self.getStateField(),
				self.getLandmarkField(false)
			])
			.setImage(self.getImage().url);
	}
}

module.exports = LocationView;
