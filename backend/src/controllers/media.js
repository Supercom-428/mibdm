'use strict';

const Media = require('../models').media;
const Helper = require('../helpers/controller');

exports.create = async (req, res) => {
    const model = Media.build({
        name: req.body.name,
        contactName: req.body.contactName,
        contactEmail: req.body.contactEmail,
        contactNumber: req.body.contactNumber,
    });

    const result = await Helper.saveModel(model, res);
    Helper.sendResult(res, result);
};

exports.getById = async (req, res) => {
    const model = await Helper.getById(Media, req.params.id);
    Helper.sendResult(res, true, {"count": Object.keys(models).length, "model": model});
};

/** @todo add support for filtering */
exports.getAll = async (req, res) => {
    const models = await Media.findAll({include: [{all: true, nested: true}]});
    Helper.sendResult(res, true, {"count": Object.keys(models).length, "models": models});
};

exports.delete = async (req, res) => {
    const result = await Helper.delete(Media, req.params.id);
    Helper.sendResult(res, result);
}

exports.update = async (req, res) => {
    const model = await Helper.getById(Media, req.params.id);
    let data = {};
    await req.params.forEach((value, key) => {
        data[key] = value;
    });
    const result = await Helper.update(Media, req.params.id, data);
    Helper.sendResult(res, result);
};
