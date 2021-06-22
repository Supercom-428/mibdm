'use strict';

const controller = require('../controllers/auth');
const requireLogin = require('../requireLogin');

module.exports = app => {
    app.get('/login', controller.showLogin);
    app.post('/login', controller.doLogin);
    app.get('/logout', requireLogin, controller.doLogout);
}
