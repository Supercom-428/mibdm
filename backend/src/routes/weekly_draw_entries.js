'use strict';

const controller = require('../controllers/weekly_draw_entries');
const guard = require('express-jwt-permissions')();

module.exports = (app, io) => {
    app.post('/weekly_draw_entries/create', guard.check('weekly_draw_entries:create'), controller.create);
    app.get('/weekly_draw_entries/get/:drawId/:entryId', guard.check('weekly_draw_entries:read'), controller.getById);
    app.get('/weekly_draw_entries/list', guard.check('weekly_draw_entries:read'), controller.getAll);
    app.post('/weekly_draw_entries/update/:entryId', guard.check('weekly_draw_entries:update'), controller.update);
    app.post('/weekly_draw_entries/delete/:drawId/:entryId', guard.check('weekly_draw_entries:delete'), controller.delete);
}
