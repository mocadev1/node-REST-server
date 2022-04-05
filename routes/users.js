const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidation } = require('../middlewares/fields-validation');
const { isValidRole, emailExists} = require('../helpers/db-validators');

const { getUsers,
        putUsers,
        postUsers,
        deleteUsers } = require('../controllers/users');

const router = Router();

router.get('/', getUsers);

router.put('/:id', putUsers);

router.post('/', [
    check('name', 'The name is obligatory').not().isEmpty(),
    check('email', 'The email is not valid').isEmail(),
    check('email').custom( emailExists ),
    check('password', 'Password must be more than six characters lenght').isLength({ min: 6 }),
    check('role').custom( isValidRole ),
    fieldsValidation
], postUsers);

router.delete('/', deleteUsers);


module.exports = router;