const { request, response } = require('express');

const User = require('../models/user');
const {encryptPassword} = require('../helpers/security-validators');


const getUsers = async (req = request, res = response) => {

    const {limit = 10, skip = 0} = req.query;
    const query = {status: true};

    // Finding all users that are not logically deleted
    const users = await User.find( query )
        .skip(skip)
        .limit(limit);

    // This is not efficient, 'cause we are making two blocking calls that are independent and can be optimized
    const count = await User.countDocuments( query );

    res.json({
        count,
        users
    });
};

const putUsers = async ( req, res = response ) => {

    const {id} = req.params;
    const {_id, password, google, ...rest} = req.body

    // TODO: Validate against DB that are trying to update their own password and no others

    // Here just encrypting the password to store it safely
    if ( password ) {
        rest.password = encryptPassword(password);
    }

    const options = {
        returnDocument: 'after'
    };

    const user = await User.findByIdAndUpdate(id, rest, options); // Added option to return document status after update

    res.json({
        user
    });
}

const postUsers = async (req, res = response) => {
    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});

    user.password = encryptPassword(password);

    // Save in DB
    await user.save();

    res.json({
        user
    });
}

const deleteUsers = (req, res = response) => {
    res.json({
        msg: 'delete API - Controller'
    });
}

module.exports = {
    getUsers,
    putUsers,
    postUsers,
    deleteUsers
}