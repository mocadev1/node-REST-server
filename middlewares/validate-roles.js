const { response } = require("express");

const isAdminRole = (req, res = response, next) => {

	if ( !req.user ) {
		return res.status(500).json({
			msg: `Validating role without validating token previously`
		});
	}
	
	const { role, name } = req.user;

	if ( role !== 'ADMIN_ROLE' ) {
		return res.status(401).json({
			msg: `${ name } is not admin role - They can't do that`
		});
	}

	next();
}

/**
	* Receiveing multiple arguments for a middleware like the check package
  **/
const hasRole = ( ...roles ) => {

	return ( req, res, next ) => {
		if ( !req.user ) {
			return res.status(500).json({
				msg: `Validating role without validating token previously`
			});
		}

		const { role, name } = req.user;

		const hasValidRole = roles.includes(role);

		if ( !hasValidRole ) {
			return res.status(401).json({
				msg: `${ name } hasn't a valid role for this action.`
			});
		}
		
		next();
	}
}

module.exports = {
	isAdminRole,
	hasRole,
}

