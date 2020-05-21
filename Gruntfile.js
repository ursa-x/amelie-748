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
					appJs: 'dist/src/amelie.js'
				}
			}
		},
		configs = require('load-grunt-configs')(grunt, options);

	grunt.registerTask('serve', [
		'shell:build',
		'shell:start'
	]);

	grunt.registerTask('dev', ['shell:dev']);

	grunt.registerTask('lint', ['watch:js']);

	grunt.initConfig(configs);
};
