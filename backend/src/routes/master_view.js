'use strict';

const controller = require('../controllers/master_view');
const guard = require('express-jwt-permissions')();

module.exports = (app, io) => {
    app.get('/master_view/data/:id', guard.check('master_view:read'), controller.getData);
}
