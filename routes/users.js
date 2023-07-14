const { Router } = require('express');
const { check, query} = require('express-validator');

const { fieldsValidation } = require('../middlewares/fields-validation');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdminRole } = require('../middlewares/validate-roles');

const { isValidRole, emailExists, userByIdExists} = require('../helpers/db-validators');

const { getUsers,
        putUsers,
        postUsers,
        deleteUsers } = require('../controllers/users');

const router = Router();

router.get('/', [
    query('limit', 'Limit should be a int').optional().isInt(),
    query('skip', 'Skip should be a int').optional().isInt(),
    fieldsValidation
], getUsers);

router.put('/:id', [
    check('id', `It's not a valid ID`).isMongoId(),
    check('id').custom( userByIdExists ),
    check('role').optional().custom( isValidRole ),
    fieldsValidation
], putUsers);

router.post('/', [
    check('name', 'The name is obligatory').not().isEmpty(),
    check('email', 'The email is not valid').isEmail(),
    check('email').custom( emailExists ),
    check('password', 'Password must be more than six characters lenght').isLength({ min: 6 }),
    check('role').custom( isValidRole ),
    fieldsValidation
], postUsers);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', `It's not a valid ID`).isMongoId(),
    check('id').custom( userByIdExists ),
    fieldsValidation
], deleteUsers);


module.exports = router;