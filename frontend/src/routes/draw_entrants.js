'use strict';

const controller = require('../controllers/draw_entrants');
const requireLogin = require('../requireLogin');

module.exports = app => {
    app.get('/draw_entrants/create', requireLogin, controller.create);
    app.post('/draw_entrants/create', requireLogin, controller.add);
    //app.get('/draw_entrants/get/:id', requireLogin, controller.getById);
    app.get('/draw_entrants/list', requireLogin, controller.getAll);
    app.get('/draw_entrants/update/:id', requireLogin, controller.getId);
    app.post('/draw_entrants/update/', requireLogin, controller.update);
    // app.post('/company/delete/:id', guard.check('company:delete'), controller.delete);
}
