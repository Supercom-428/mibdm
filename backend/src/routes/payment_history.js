'use strict';

const controller = require('../controllers/payment_history');
const guard = require('express-jwt-permissions')();

module.exports = (app, io) => {
    app.post('/payment_history/create', guard.check('payment_history:create'), controller.create);
    app.get('/payment_history/get/:id', guard.check('payment_history:read'), controller.getById);
    app.get('/payment_history/list', guard.check('payment_history:read'), controller.getAll);
    app.post('/payment_history/update/:id', guard.check('payment_history:update'), controller.update);
    app.post('/payment_history/delete/:id', guard.check('payment_history:delete'), controller.delete);
}
