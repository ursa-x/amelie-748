const funnel = require('broccoli-funnel');
const babel = require('broccoli-babel-transpiler');
const mergeTrees = require('broccoli-merge-trees');

const appSrcDir = 'src',
	assetsDir = 'assets';

const transpiledAppSrc = babel(appSrcDir, {
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

const appSrc = funnel(transpiledAppSrc, {
	destDir: appSrcDir
});

const assets = funnel(assetsDir, {
	destDir: assetsDir
});

module.exports = mergeTrees([appSrc, assets], {
	overwrite: true
});
