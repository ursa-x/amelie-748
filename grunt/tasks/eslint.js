module.exports = () => {
	return {
		all: {
			options: {
				configFile: '<%= paths.grunt.eslint %>'
			},
			src: [
				'<%= paths.src.js %>',
				'<%= paths.src.appJs %>'
			]
		}
	}
};
