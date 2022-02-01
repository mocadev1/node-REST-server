const { response } = require('express');


const getUsers = (req, res = response) => {
    res.json({
        msg: 'get API - Controller'
    });
};

const putUsers = (req, res = response) => {
    res.json({
        msg: 'put API - Controller'
    });
}

const postUsers = (req, res = response) => {
    res.json({
        msg: 'post API - Controller'
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