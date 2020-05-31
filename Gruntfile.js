/* Gruntfile.js */

module.exports = (grunt) => {
	require('load-grunt-tasks')(grunt);

	let options = {
			config: {
				pkg: grunt.file.readJSON('package.json'),
				src: 'grunt/tasks/*.js'
			},
			paths: {
				grunt: {
					tasks: 'grunt',
					eslint: 'grunt/eslint.json'
				},
				src: {
					dir: 'src',
					js: 'src/**/*.js',
					appJs: 'src/amelie.js'
				},
				dist: {
					appJs: 'dist/src/amelie.js',
					logs: 'dist/logs',
					archive: 'archive'
				}
			}
		},
		configs = require('load-grunt-configs')(grunt, options);

	// Lint all .js files
	grunt.registerTask('lint', ['watch:js']);

	// Serve dev app
	grunt.registerTask('dev', [
		'archivePreviousState',		
		'shell:dev_build',
    'pre_start',
		'shell:dev_start'
	]);

	// Serve dev app with live reload
	grunt.registerTask('serve', ['shell:serve']);


	// Serve production-ready app
	grunt.registerTask('prod', [
		'archivePreviousState',		
		'shell:prod_build',
		'pre_start',
		'shell:prod_start'
	]);

	grunt.registerTask('archivePreviousState', ['shell:archive_logs']);
	grunt.registerTask('pre_start', ['shell:create_logs_dir']);

	grunt.initConfig(configs);
};
