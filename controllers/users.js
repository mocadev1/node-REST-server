const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');


const getUsers = (req = request, res = response) => {

    const {nombre, apellido} = req.query
    
    res.json({
        msg: 'get API - Controller',
        nombre,
        apellido
    });
};

const putUsers = (req, res = response) => {

    const id = req.params.id;
    
    res.json({
        msg: 'put API - Controller',
        id
    });
}

const postUsers = async (req, res = response) => {
    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});

    // Password encryption
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt);

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