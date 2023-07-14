
const fieldsValidation = require('../middlewares/fields-validation');
const validateJWT = require('../middlewares/validate-jwt');
const validateRoles  = require('../middlewares/validate-roles');

module.exports = {
	...fieldsValidation,
	...validateJWT,
	...validateRoles,
};

