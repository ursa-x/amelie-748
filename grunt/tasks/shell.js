module.exports = () => {
	return {
		build: {
			command: `rm -rf dist && broccoli build`
		},
		start: {
			command: 'node <%= paths.dist.appJs %>'
		},
		dev: {
			command: `nodemon --exec grunt serve`
		}
	}
};
