/* General error messages */

exports.SYSTEM = {
	getPackageVersionErrorMessage: (packageName, requiredVersion) => {
		const errorMessage = `You are not using the right ${packageName} version! Required version: ${requiredVersion}+`;

		return errorMessage;
	}
};
