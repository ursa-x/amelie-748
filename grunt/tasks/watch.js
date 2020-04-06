module.exports = (grunt, options) => {
	return {
		scripts: {
			files: [
				'app.js'
			],
			tasks: ['shell:grunt'],
			options: {
				spawn: false,
			},
		},
	};
};
