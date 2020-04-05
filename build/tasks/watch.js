module.exports = (grunt, options) => {
	return {
		scripts: {
			files: [
				'app.js'
			],
			tasks: ['shell:build'],
			options: {
				spawn: false,
			},
		},
	};
};
