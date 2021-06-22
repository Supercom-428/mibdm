'use strict';

const controller = require('../controllers/admin_actions_log');
const guard = require('express-jwt-permissions')();

module.exports = (app, io) => {
    app.post('/admin_actions_log/create', controller.create);
    app.get('/admin_actions_log/get/:id', guard.check('admin_actions_log:read'), controller.getById);
    app.get('/admin_actions_log/list', guard.check('admin_actions_log:read'), controller.getAll);
    app.post('/admin_actions_log/update/:id', guard.check('admin_actions_log:update'), controller.update);
    app.post('/admin_actions_log/delete/:id', guard.check('admin_actions_log:delete'), controller.delete);
}
