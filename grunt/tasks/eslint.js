/* FIX: Task runner is unable to discover files */

module.exports = (grunt, options) => {
	return {
		all: {
			options: {
				configFile: '<%= paths.config %>/eslint.json'
			},
			target: [
				'<%= paths.app %>/app.js',
				'arguments/*.js',
				'commands/*.js',
				'messages/*.js'
			]
		}
	}
};
