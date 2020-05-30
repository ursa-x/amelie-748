module.exports = () => {
	return {
		dev_build: {
			command: 'rm -rf dist && broccoli build --dev'
		},
		prod_build: {
			command: 'rm -rf dist && broccoli build --prod'
		},
		dev_start: {
			command: 'node <%= paths.dist.appJs %>'
		},
		prod_start: {
			command: 'pm2 start <%= paths.dist.appJs %>'
		},
		serve: {
			command: 'nodemon --exec grunt dev'
		},
		terminal_reset: {
			command: 'reset'
		}
	}
};
