const Role = require('../models/role');
const User = require('../models/user')
const res = require('express/lib/response');


const isValidRole = async ( role = '' ) => {
    const roleExists = await Role.findOne( {role} );

    if ( !roleExists ) {
        throw new Error(`The role ${ role } does not exist in the DB.`);
    }
};


const emailExists = async ( email = '' ) => {
    // Verify that email exists
    const emailExists = await User.findOne({ email });
    if ( emailExists ) {
        throw new Error(`The email "${ email }" has already been used`);
    }
}

const userByIdExists = async ( id ) => {
    // Verify whether is a user on our database
    const exists = await User.findById(id);
    if ( !exists ) {
        throw new Error(`The id "${ id }" does not exist in the DB`);
    }
}

module.exports = {
    isValidRole,
    emailExists,
    userByIdExists
}
