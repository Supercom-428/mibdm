'use strict';

const DrawEntry = require('../models').drawEntries;
const Helper = require('../helpers/controller');

exports.create = async (req, res) => {
    const model = DrawEntry.build({
        entryNumber: req.body.entryNumber,
        entrantId: req.body.entrantId,
        status: '0'
    });

    const result = await Helper.saveModel(model, res);
    Helper.sendResult(res, result);
};

exports.getById = async (req, res) => {
    const model = await Helper.getById(DrawEntry, req.params.id);
    Helper.sendResult(res, true, {"count": Object.keys(models).length, "model": model});
};

/** @todo add support for filtering */
exports.getAll = async (req, res) => {
    const models = await DrawEntry.findAll({include: [{all: true, nested: true}]});
    Helper.sendResult(res, true, {"count": Object.keys(models).length, "models": models});
};

exports.delete = async (req, res) => {
    const result = await Helper.delete(DrawEntry, req.params.id);
    Helper.sendResult(res, result);
}

exports.update = async (req, res) => {
    const model = await Helper.getById(DrawEntry, req.params.id);
    let data = {};
    await req.params.forEach((value, key) => {
        data[key] = value;
    });
    const result = await Helper.update(DrawEntry, req.params.id, data);
    Helper.sendResult(res, result);
};
