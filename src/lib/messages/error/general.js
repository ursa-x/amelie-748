/* General error messages */

exports.SYSTEM = {
	getPackageVersionErrorMessage: (packageName, requiredVersion) => {
		return `You are not using the right ${packageName} version! Required version: ${requiredVersion}+`;
	}
};
