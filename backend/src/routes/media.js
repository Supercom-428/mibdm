'use strict';

const controller = require('../controllers/media');
const guard = require('express-jwt-permissions')();

module.exports = (app, io) => {
    app.post('/media/create', guard.check('media:create'), controller.create);
    app.get('/media/get/:id', guard.check('media:read'), controller.getById);
    app.get('/media/list', guard.check('media:read'), controller.getAll);
    app.post('/media/update/:id', guard.check('media:update'), controller.update);
    app.post('/media/delete/:id', guard.check('media:delete'), controller.delete);
}
