'use strict';

const controller = require('../controllers/weekly_draw_media');
const guard = require('express-jwt-permissions')();

module.exports = (app, io) => {
    app.post('/weekly_draw_media/create', guard.check('weekly_draw_media:create'), controller.create);
    app.get('/weekly_draw_media/get/:drawId/:mediaId', guard.check('weekly_draw_media:read'), controller.getById);
    app.get('/weekly_draw_media/list', guard.check('weekly_draw_media:read'), controller.getAll);
    app.post('/weekly_draw_media/update/:drawId/:mediaId', guard.check('weekly_draw_media:update'), controller.update);
    app.post('/weekly_draw_media/delete/:drawId/:mediaId', guard.check('weekly_draw_media:delete'), controller.delete);
}
