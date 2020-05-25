module.exports = () => {
	return {
		dev_build: {
			command: 'rm -rf dist && broccoli build --dev'
		},
		prod_build: {
			command: 'rm -rf dist && broccoli build --prod'
		},
		start: {
			command: 'node <%= paths.dist.appJs %>'
		},
		serve: {
			command: 'nodemon --exec grunt dev'
		},
		terminal_reset: {
			command: 'reset'
		}
	}
};
