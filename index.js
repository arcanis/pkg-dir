'use strict';
const path = require('path');
const findUp = require('find-up');

const pnp = process.versions.pnp ? require('pnpapi') : null;

const pkgDir = async cwd => {
	if (pnp && pnp.findPackageLocator(cwd+'/'))
		return pnp.getPackageInformation(pnp.topLevel).packageLocation;
	const filePath = await findUp('package.json', {cwd});
	return filePath ? path.dirname(filePath) : undefined;
};

module.exports = pkgDir;
// TODO: Remove this for the next major release
module.exports.default = pkgDir;

module.exports.sync = cwd => {
	const filePath = findUp.sync('package.json', {cwd});
	return filePath ? path.dirname(filePath) : undefined;
};
