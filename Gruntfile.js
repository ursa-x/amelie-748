/* Gruntfile.js */

module.exports = (grunt) => {
	require('load-grunt-tasks')(grunt);

	let options = {
			config: {
				pkg: grunt.file.readJSON('package.json'),
				src: 'grunt/tasks/*.js'
			},
			paths: {
				config: './grunt',
				appFile: 'app.js'
			}
		},
		configs = require('load-grunt-configs')(grunt, options);

	grunt.initConfig(configs);
};
