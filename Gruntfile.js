/* Gruntfile.js */

module.exports = (grunt) => {
	require('load-grunt-tasks')(grunt);

	let options = {
			config: {
				pkg: grunt.file.readJSON('package.json'),
				src: 'build/grunts/*.js'
			},
			paths: {
				grunt: {
					eslint: 'build/eslint.json'
				},
				raw: {
					src: 'src',
					js: 'src/**/*.js',
					appJs: 'src/amelie.js'
				},
				dist: {
					appJs: 'dist/app/src/amelie.js',
					logs: 'dist/logs',
					logFile: 'dist/logs/application.log',
					archive: 'dist/archive'
				}
			}
		},
		configs = require('load-grunt-configs')(grunt, options);

	// Serve production-ready app after archiving
	grunt.registerTask('prod', 'Serve the production app', [
		'shell:archive_logs',
		'shell:prod_build',
		'create:log',
		'shell:prod_start'
	]);

	// Serve dev app after archiving
	grunt.registerTask('dev', 'Serve the development app', [
		'shell:archive_logs',
		'shell:dev_build',
		'create:log',
		'shell:dev_start'
	]);

	// Serve dev app with live reload
	grunt.registerTask('serve', 'Serve the development app with live reload', ['shell:serve']);

	// Lint all .js files
	grunt.registerTask('lint', 'Lint all js files', ['watch:js']);

	// Serve dev app
	grunt.registerTask('dev:live', 'Run on nodemon\'s command after a file save', [
		'shell:dev_build',
		'create:log',
		'shell:dev_start'
	]);

	// Create a log file
	grunt.registerTask('create:log', 'Creates application.log inside \'logs\' directory', function() {
		grunt.file.write(`${options.paths.dist.logFile}`);
	});

	grunt.initConfig(configs);
};
