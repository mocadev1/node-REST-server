const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidation } = require('../middlewares/fields-validation');

const { login } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('email', 'Email is obligatory').isEmail(),
    check('password', 'Password is obligatory').not().isEmpty(),
    fieldsValidation
], login)

module.exports = router;