'use strict';

const controller = require('../controllers/company');
const requireLogin = require('../requireLogin');

module.exports = app => {
    app.get('/company/create', requireLogin, controller.create);
    app.post('/company/create', requireLogin, controller.add);
    // app.get('/company/get/:id', guard.check('company:read'), controller.getById);
    app.get('/company/list', requireLogin, controller.getAll);
    app.get('/company/update/:id', requireLogin, controller.getById);
    app.post('/company/update/', requireLogin, controller.update);
    // app.post('/company/delete/:id', guard.check('company:delete'), controller.delete);
}
