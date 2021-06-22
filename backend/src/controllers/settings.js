'use strict';

const Settings = require('../models').settings;
const Helper = require('../helpers/controller');

exports.save = async (req, res) => {
    console.log(req.body);
    const data = {
        code: req.params.code,
        userId: req.user.userId,
        settings: req.body.settings,
    };
    console.log(data);
    await Settings.upsert(data);

    // const result = await Helper.saveModel(model, res);
    const result = true;
    Helper.sendResult(res, result);
};
