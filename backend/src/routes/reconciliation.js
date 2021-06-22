'use strict';

const controller = require('../controllers/reconciliation');
const guard = require('express-jwt-permissions')();

module.exports = (app, io) => {
    app.post('/reconciliation/create', guard.check('reconciliation:create'), controller.create);
    app.get('/reconciliation/get/:id', guard.check('reconciliation:get'), controller.getById);
    app.get('/reconciliation/list', guard.check('reconciliation:list'), controller.getAll);
    app.post('/reconciliation/update/:id', guard.check('reconciliation:update'), controller.update);
    app.post('/reconciliation/delete/:id', guard.check('reconciliation:delete'), controller.delete);
}
