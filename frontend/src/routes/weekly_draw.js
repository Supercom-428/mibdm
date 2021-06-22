'use strict';

const controller = require('../controllers/weekly_draw');
const requireLogin = require('../requireLogin');

module.exports = app => {
    // app.post('/company/create', guard.check('company:create'), controller.create);
    // app.get('/company/get/:id', guard.check('company:read'), controller.getById);
    app.get('/weekly_draw/list', requireLogin, controller.getAll);
    app.get('/weekly_draw/run', requireLogin, controller.showCreateDraw);
    app.post('/weekly_draw/run', requireLogin, controller.run);
    // app.post('/company/update/:id', guard.check('company:update'), controller.update);
    // app.post('/company/delete/:id', guard.check('company:delete'), controller.delete);
}
