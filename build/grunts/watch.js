module.exports = () => {
	return {
		js: {
			files: [
				'<%= paths.raw.js %>',
				'<%= paths.raw.appJs %>'
			],
			tasks: [
				'shell:terminal_reset',
				'eslint:all'
			],
			options: {
				spawn: false,
			}
		}
	}
};
