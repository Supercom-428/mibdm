'use strict';

const controller = require('../controllers/master_view');
const requireLogin = require('../requireLogin');

module.exports = app => {
    app.get('/master-view/:id', requireLogin, controller.getMasterView);
    app.get('/master-view/deleted/:id', requireLogin, controller.getMasterView);
    app.post('/master-view/update', requireLogin, controller.update);
    app.post('/master-view/delete', requireLogin, controller.delete);
}
