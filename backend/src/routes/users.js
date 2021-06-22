'use strict';

const controller = require('../controllers/users');
const guard = require('express-jwt-permissions')();

module.exports = (app, io) => {
    app.post('/users/create', guard.check('users:create'), controller.create);
    app.get('/users/get/:id', guard.check('users:read'), controller.getById);
    app.get('/users/list', guard.check('users:read'), controller.getAll);
    app.post('/users/update/:id', guard.check('users:update'), controller.update);
    app.post('/users/delete/:id', guard.check('users:delete'), controller.delete);
};
