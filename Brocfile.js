const funnel = require('broccoli-funnel');
const babel = require('broccoli-babel-transpiler');
const replace = require('broccoli-string-replace');
const mergeTrees = require('broccoli-merge-trees');

const APP_PROPERTIES = {
	MADAM_NAZAR_API_DOMAIN: {
		development: 'https://madam-nazar-location-api-2.herokuapp.com',
		production: 'https://madam-nazar-location-api.herokuapp.com'
	},
	SERVER_PREFIX: {
		development: '+',
		production: 'r!'
	}
}

const paths = {
	raw: {
		src: 'src',
		assets: 'assets',
		data: 'data'
	},
	app: {
		src: 'src',
		assets: 'assets',
		data: 'data'
	}
};

module.exports = (options) => {
	// Replace strings in 'src' files
	const replaceSrcTree = replace(paths.raw.src, {
		files: [
			'lib/settings/url.js',
			'lib/config.json'
		],
		patterns: [
			{
				match: /@@madamNazarIOAPIDomain/g,
				replacement: APP_PROPERTIES.MADAM_NAZAR_API_DOMAIN[options.env]
			},
			{
				match: /@@serverPrefix/g,
				replacement: APP_PROPERTIES.SERVER_PREFIX[options.env]
			}
		]
	});

	// Transpile the ES6 files in string-replaced 'src'
	const transpiledSrcTree = babel(replaceSrcTree, {
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

	// Copy the assets directory
	const assetsTree = funnel(paths.raw.assets, {
		destDir: paths.app.assets
	});

	// Copy the data directory
	const dataTree = funnel(paths.raw.data, {
		destDir: paths.app.data
	});

	// Merge all trees and write to destination folder
	return mergeTrees([srcTree, assetsTree, dataTree], {
		overwrite: true
	});
};
