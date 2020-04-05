/* Gruntfile.js */
module.exports = (grunt) => {
	require('load-grunt-tasks')(grunt);

	let options = {
			config: {
				pkg: grunt.file.readJSON('package.json'),
				src: 'build/tasks/*.js'
			},
			paths: {
				config: './build',
				appFile: 'app.js'
			}
		},
		configs = require('load-grunt-configs')(grunt, options);

	grunt.initConfig(configs);
};
