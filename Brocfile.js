const funnel = require('broccoli-funnel');
const babel = require('broccoli-babel-transpiler');
const replace = require('broccoli-string-replace');
const mergeTrees = require('broccoli-merge-trees');

const APP_PROPERTIES = {
	MADAM_NAZAR_API_DOMAIN: {
		development: 'https://madam-nazar-location-api-2.herokuapp.com',
		production: 'https://madam-nazar-location-api.herokuapp.com'
	}
}

module.exports = (options) => {
	const appSrcDir = 'src',
		assetsDir = 'assets';

	const transpiledSrcTree = babel(appSrcDir, {
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

	const replaceSrcTree = replace(transpiledSrcTree, {
		files: ['lib/settings/url.js'],
		pattern: {
			match: /@@madamNazarIOAPIDomain/g,
			replacement: APP_PROPERTIES.MADAM_NAZAR_API_DOMAIN[options.env]
		}
	});

	const srcTree = funnel(replaceSrcTree, {
		destDir: appSrcDir
	});

	const assetsTree = funnel(assetsDir, {
		destDir: assetsDir
	});

	const appTree = mergeTrees([srcTree, assetsTree], {
		overwrite: true
	});

	return appTree;
};
