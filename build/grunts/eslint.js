module.exports = () => {
	return {
		all: {
			options: {
				configFile: '<%= paths.grunt.eslint %>'
			},
			src: [
				'<%= paths.raw.js %>',
				'<%= paths.raw.appJs %>'
			]
		}
	}
};
