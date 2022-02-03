const { request, response } = require('express');


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

const postUsers = (req, res = response) => {

    const body = req.body;
    
    res.json({
        msg: 'post API - Controller',
        body
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