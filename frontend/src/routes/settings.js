'use strict';

const controller = require('../controllers/settings');
const requireLogin = require('../requireLogin');

module.exports = app => {
    app.post('/settings/save', requireLogin, controller.save);
}
