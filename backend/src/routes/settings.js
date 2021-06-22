'use strict';

const controller = require('../controllers/settings');
const guard = require('express-jwt-permissions')();

module.exports = (app, io) => {
    app.post('/settings/save/:code', controller.save);
}
