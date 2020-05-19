module.exports = (grunt, options) => {
	return {
		all: {
			options: {
				configFile: 'grunt/eslint.json'
			},
			src: [
				'src/**/*.js',
				'src/amelie.js'
			]
		}
	}
};
