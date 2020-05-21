module.exports = () => {
	return {
		js: {
			files: [
				'<%= paths.src.js %>',
				'<%= paths.src.appJs %>'
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
