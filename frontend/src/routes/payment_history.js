'use strict';

const controller = require('../controllers/payment_history');
const requireLogin = require('../requireLogin');

module.exports = app => {
    // app.post('/company/create', guard.check('company:create'), controller.create);
    // app.get('/company/get/:id', guard.check('company:read'), controller.getById);
    app.get('/payment_history/list', requireLogin, controller.getAll);
    // app.post('/company/update/:id', guard.check('company:update'), controller.update);
    // app.post('/company/delete/:id', guard.check('company:delete'), controller.delete);
}
