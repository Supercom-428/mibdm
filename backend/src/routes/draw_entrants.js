'use strict';

const controller = require('../controllers/draw_entrants');
const guard = require('express-jwt-permissions')();

module.exports = (app, io) => {
    app.post('/draw_entrants/create', guard.check('draw_entrants:create'), controller.create);
    app.get('/draw_entrants/get/:id', guard.check('draw_entrants:read'), controller.getById);
    app.get('/draw_entrants/list', guard.check('draw_entrants:read'), controller.getAll);
    app.post('/draw_entrants/update/:id', guard.check('draw_entrants:update'), controller.update);
    app.post('/draw_entrants/delete/:id', guard.check('draw_entrants:delete'), controller.delete);

    app.get('/draw_entrants/options', guard.check('draw_entrants:read'), controller.options);
}
