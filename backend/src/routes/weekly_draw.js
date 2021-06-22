'use strict';

const controller = require('../controllers/weekly_draw');
const guard = require('express-jwt-permissions')();

module.exports = (app, io) => {
    app.post('/weekly_draw/create', guard.check('weekly_draw:create'), controller.create);
    app.get('/weekly_draw/get/:id', guard.check('weekly_draw:read'), controller.getById);
    app.get('/weekly_draw/list', guard.check('weekly_draw:read'), controller.getAll);
    app.post('/weekly_draw/update/:id', guard.check('weekly_draw:update'), controller.update);
    app.post('/weekly_draw/delete/:id', guard.check('weekly_draw:delete'), controller.delete);
    app.get('/weekly_draw/next', guard.check('weekly_draw:create'), controller.getNextDraw);
    app.post('/weekly_draw/generateWinner', guard.check('weekly_draw:update'), controller.generateWinner);
}
