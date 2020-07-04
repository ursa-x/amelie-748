const funnel = require('broccoli-funnel');
const babel = require('broccoli-babel-transpiler');
const mergeTrees = require('broccoli-merge-trees');

// TODO: Comment build structure

const paths = {
	raw: {
		src: 'src',
		config: 'build/config',
		assets: 'assets',
		data: 'data'
	},
	app: {
		src: 'src',
		config: {
			root: 'config',
			file: 'properties.json'
		},
		assets: 'assets',
		data: 'data'
	}
};

module.exports = (options) => {
	// Transpile the ES6 files in string-replaced 'src'
	const transpiledSrcTree = babel(paths.raw.src, {
		// In case more options are required, presets may be moved to .babelrc
		presets: [
			[
				'@babel/env', {
				'targets': {
					'node': true
				}
			}
			]
		]
	});

	// Write the transpiled app source files to dist/src
	const srcTree = funnel(transpiledSrcTree, {
		destDir: paths.app.src
	});

	// Copy the single configuration file for this environment
	const configTree = funnel(paths.raw.config, {
		destDir: paths.app.config.root,
		include: [`**/${options.env}.json`],
		getDestinationPath: (relativeFile) => paths.app.config.file
	});

	// Copy the assets directory
	const assetsTree = funnel(paths.raw.assets, {
		destDir: paths.app.assets
	});

	// Copy the data directory
	const dataTree = funnel(paths.raw.data, {
		destDir: paths.app.data
	});

	// Merge all trees and write to destination folder
	return mergeTrees([srcTree, configTree, assetsTree, dataTree], {
		overwrite: true
	});
};
