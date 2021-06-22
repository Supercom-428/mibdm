'use strict';

const controller = require('../controllers/draw_entrant_form');
const guard = require('express-jwt-permissions')();

module.exports = (app, io) => {
    app.post('/draw_entrant_form/create', guard.check('draw_entrant_form:create'), controller.create);
    app.get('/draw_entrant_form/get/:formId/:entrantId', guard.check('draw_entrant_form:read'), controller.getById);
    app.get('/draw_entrant_form/list', guard.check('draw_entrant_form:read'), controller.getAll);
    app.post('/draw_entrant_form/update/:formId/:entrantId', guard.check('draw_entrant_form:update'), controller.update);
    app.post('/draw_entrant_form/delete/:formId/:entrantId', guard.check('draw_entrant_form:delete'), controller.delete);
}
