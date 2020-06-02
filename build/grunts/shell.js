module.exports = () => {
	return {
		dev_build: {
			command: [
				'rm -rf dist/app',
				'broccoli build dist/app --dev'
			].join('&&')
		},
		prod_build: {
			command: [
				'rm -rf dist/app',
				'broccoli build dist/app --prod'
			].join('&&')
		},
		dev_start: {
			command: 'node <%= paths.dist.appJs %>'
		},
		prod_start: {
			command: 'pm2 start <%= paths.dist.appJs %>'
		},
		serve: {
			command: 'nodemon --exec grunt dev:live'
		},
		terminal_reset: {
			command: 'reset'
		},
		archive_logs: {
			command: [
				'export logs_archivePath="<%= paths.dist.archive %>/logs/"$(date +"%d-%m-%Y-%H-%M-%S")""',
				'mkdir -p "$logs_archivePath"',
				'cp -r <%= paths.dist.logs %>/. "$logs_archivePath" 2>/dev/null || :',
				'rm -rf "<%= paths.dist.logs %>"'
			].join('&&')
		}
	}
};
