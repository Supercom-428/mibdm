'use strict';

const controller = require('../controllers/draw_entries');
const guard = require('express-jwt-permissions')();

module.exports = (app, io) => {
    app.post('/draw_entries/create', guard.check('draw_entries:create'), controller.create);
    app.get('/draw_entries/get/:id', guard.check('draw_entries:read'), controller.getById);
    app.get('/draw_entries/list', guard.check('draw_entries:read'), controller.getAll);
    app.post('/draw_entries/update/:id', guard.check('draw_entries:update'), controller.update);
    app.post('/draw_entries/delete/:id', guard.check('draw_entries:delete'), controller.delete);
}
