const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/user')

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        // Check that email exists
        const user = await User.findOne({ email } );
        if ( !user ) {
            return res.status(400).json({
                msg: 'Email / Password are not valid - email'
            });
        }

        // Is the user still active?
        if ( !user.status ) {
            return res.status(400).json({
                msg: 'This user is not active - status'
            });
        }

        // Check password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Email / Password are not valid - password'
            });
        }

        // Generate JWT

        res.json({
            msg: "login ok"
        });
    }catch ( error ) {
        console.log(error);
        res.status(500).json({
            msg: "Please contact the administrator"
        });
    }
};

module.exports = {
    login
};