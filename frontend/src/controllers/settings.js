'use strict';

const axios = require('axios');

exports.save = async (req, res) => {
    const config = {
        headers: { Authorization: `Bearer ${req.session.token}` }
    };
    try {
        console.log(process.env.API_URL + '/settings/save/' + req.body.code);
        console.log(req.body);
        const data = await axios.post(process.env.API_URL + '/settings/save/' + req.body.code, {
            settings: req.body.settings,
        }, config).then(result => {
            return result.data;
        });
        res.send(JSON.stringify(data));
    } catch(e) {
        console.log(e);
        next(e);
    }
};
