'use strict';

const controller = require('../controllers/permissions');
const guard = require('express-jwt-permissions')();

module.exports = (app, io) => {
    app.post('/permissions/create', guard.check('permissions:create'), controller.create);
    app.get('/permissions/get/:id', guard.check('permissions:get'), controller.getById);
    app.get('/permissions/list', guard.check('permissions:list'), controller.getAll);
    app.post('/permissions/update/:id', guard.check('permissions:update'), controller.update);
    app.post('/permissions/delete/:id', guard.check('permissions:delete'), controller.delete);
}
