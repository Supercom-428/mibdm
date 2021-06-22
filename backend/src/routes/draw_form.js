'use strict';

const controller = require('../controllers/draw_form');
const guard = require('express-jwt-permissions')();

module.exports = (app, io) => {
    app.post('/draw_form/create', guard.check('draw_form:create'), controller.create);
    app.get('/draw_form/get/:id', guard.check('draw_form:read'), controller.getById);
    app.get('/draw_form/list', guard.check('draw_form:read'), controller.getAll);
    app.post('/draw_form/update/:id', guard.check('draw_form:update'), controller.update);
    app.post('/draw_form/delete/:id', guard.check('draw_form:delete'), controller.delete);
}
