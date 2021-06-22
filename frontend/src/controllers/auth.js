'use strict';

const axios = require('axios');

exports.showLogin = (req, res, next) => {
    res.render('login');
};

exports.doLogin = async (req, res, next) => {
    try {
        //Here I'm authenticating this users if
        //users exists and its pasword is correct.
        const data = await axios.post(process.env.API_URL + '/auth/login', {
            username: req.body.username,
            password: req.body.password,
        }).then(result => {
            if (result.data.result === false) {
                throw new Error('Invalid authentication');
            }
            return result.data;
        });

        if (data.token === '') {
            throw new Error('Invalid authentication');
        }
        //If user verified we'll create a session
        //for this user by stroing it's information
        req.session.token = data.token;
        req.session.user = data.user;
        res.redirect('/');
    } catch(e) {
        console.log(e);
        next(e);
    }
};

exports.doLogout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            return next(err);
        }

        res.redirect('/');
    });
};
