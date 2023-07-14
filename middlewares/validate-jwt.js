const jwt = require('jsonwebtoken');
const {request, response} = require('express');

const User = require('../models/user');

const validateJWT = async ( req = request, res = response, next ) => {
    // The argument is the header name we want to get
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
           msg: `There's no token in the request`
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // Reading the user trying to delete 
        const user = await User.findById(uid);

        if ( !user ) {
            return res.status(401).json({
                msg: `Invalid token - nonexistent user in DB`
            })
        }

        // Checking if uid is active
        if ( !user.status ) {
            return res.status(401).json({
                msg: `Invalid token - user with status: false`
            })
        }
        
        req.user = user;

        console.log(req.user);

        // This is a new property inside the request
        req.uid = uid

        next();
    } catch ( e ) {
        console.log(e);
        res.status(401).json({
            msg: 'Invalid token'
        })
    }

}

module.exports = {
    validateJWT
};