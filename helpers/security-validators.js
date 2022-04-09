const bcryptjs = require('bcryptjs');


const encryptPassword = ( password = '' ) => {
    // Password encryption
    const salt = bcryptjs.genSaltSync();
    return bcryptjs.hashSync( password, salt);
}


module.exports = {
    encryptPassword
}
