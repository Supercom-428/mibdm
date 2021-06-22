'use strict';

const PaymentHistory = require('../models').paymentHistory;
const Helper = require('../helpers/controller');

exports.create = async (req, res) => {
    const model = PaymentHistory.build({
        date: req.body.date,
        documentId: req.body.documentId,
        description: req.body.description,
        amount: req.body.amount,
    });

    const result = await Helper.saveModel(model, res);
    Helper.sendResult(res, result);
};

exports.getById = async (req, res) => {
    const model = await Helper.getById(PaymentHistory, req.params.id);
    Helper.sendResult(res, true, {"count": Object.keys(models).length, "model": model});
};

/** @todo add support for filtering */
exports.getAll = async (req, res) => {
    const models = await PaymentHistory.findAll({include: [{all: true, nested: true}]});
    Helper.sendResult(res, true, {"count": Object.keys(models).length, "models": models});
};

exports.delete = async (req, res) => {
    const result = await Helper.delete(PaymentHistory, req.params.id);
    Helper.sendResult(res, result);
}

exports.update = async (req, res) => {
    const model = await Helper.getById(PaymentHistory, req.params.id);
    let data = {};
    await req.params.forEach((value, key) => {
        data[key] = value;
    });
    const result = await Helper.update(PaymentHistory, req.params.id, data);
    Helper.sendResult(res, result);
};
