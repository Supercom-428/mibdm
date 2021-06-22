'use strict';

const Reconciliation = require('../models').reconciliation;
const Helper = require('../helpers/controller');

exports.create = async (req, res) => {
    const model = Reconciliation.build({
        reference: req.body.reference,
        name: req.body.name,
        drawEntrantId: req.body.entrant_id,
        companyId: req.body.company_id,
    });

    const result = await Helper.saveModel(model, res);
    Helper.sendResult(res, result);
};

exports.getById = async (req, res) => {
    const model = await Helper.getById(Reconciliation, req.params.id);
    Helper.sendResult(res, true, {"count": Object.keys(models).length, "model": model});
};

/** @todo add support for filtering */
exports.getAll = async (req, res) => {
    const models = await Reconciliation.findAll({include: [{all: true, nested: true}]});
    Helper.sendResult(res, true, {"count": Object.keys(models).length, "models": models});
};

exports.delete = async (req, res) => {
    const result = await Helper.delete(Reconciliation, req.params.id);
    Helper.sendResult(res, result);
}

exports.update = async (req, res) => {
    const model = await Helper.getById(Reconciliation, req.params.id);
    let data = {};
    await req.params.forEach((value, key) => {
        data[key] = value;
    });
    const result = await Helper.update(Reconciliation, req.params.id, data);
    Helper.sendResult(res, result);
};
