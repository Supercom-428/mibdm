'use strict';

const controller = require('../controllers/dashboard');
const requireLogin = require('../requireLogin');

module.exports = app => {
    app.get('/', requireLogin, controller.dashboard);
}
