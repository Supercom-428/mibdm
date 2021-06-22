'use strict';

const controller = require('../controllers/roles');
const guard = require('express-jwt-permissions')();

module.exports = (app, io) => {
    app.post('/roles/create', guard.check('roles:create'), controller.create);
    app.get('/roles/get/:id', guard.check('roles:read'), controller.getById);
    app.get('/roles/list', guard.check('roles:list'), controller.getAll);
    app.post('/roles/update/:id', guard.check('roles:update'), controller.update);
    app.post('/roles/delete/:id', guard.check('roles:delete'), controller.delete);
}
