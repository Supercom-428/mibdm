'use strict';

const controller = require('../controllers/company');
const guard = require('express-jwt-permissions')();

module.exports = (app, io) => {
    app.post('/company/create', guard.check('company:create'), controller.create);
    app.get('/company/get/:id', guard.check('company:read'), controller.getById);
    app.get('/company/list', guard.check('company:read'), controller.getAll);
    app.post('/company/update/:id', guard.check('company:update'), controller.update);
    app.post('/company/delete/:id', guard.check('company:delete'), controller.delete);
    app.get('/company/options', guard.check('company:read'), controller.options);
}
