const Role = require('../models/role');


const isValidRole = async ( role = '' ) => {
    const roleExists = await Role.findOne( {role} );

    if ( !roleExists ) {
        throw new Error(`The role ${ role } does not exist in the DB.`);
    }
};


module.exports = {
    isValidRole
}