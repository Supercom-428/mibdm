'use strict';

const axios = require('axios');

exports.dashboard = (req, res) => {
    console.log(req.session.user);
    res.render('dashboard', {
        user: req.session.user
    });
};
