'use strict';

const controller = require('../controllers/auth');

module.exports = (app, io) => {
    app.post('/auth/login', controller.login);
}
