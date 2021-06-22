'use strict';

const DrawEntrantForm = require('../models').drawEntrantForm;
const Helper = require('../helpers/controller');

exports.create = async (req, res) => {
    const model = DrawEntrantForm.build({
        formId: req.body.formId,
        entrantId: req.body.entrantId,
        dateSent: req.body.dateSent,
        dateReceived: req.body.dateReceived,
        dateCopyReturned: req.body.dateCopyReturned,
    });

    const result = await Helper.saveModel(model, res);
    Helper.sendResult(res, result);
};

exports.getById = async (req, res) => {
    const model = await Helper.getById(DrawEntrantForm, [
        req.params.formId,
        req.params.entrantId,
    ]);
    Helper.sendResult(res, true, {"count": Object.keys(models).length, "model": model});
};

/** @todo add support for filtering */
exports.getAll = async (req, res) => {
    const models = await DrawEntrantForm.findAll({include: [{all: true, nested: true}]});
    Helper.sendResult(res, true, {"count": Object.keys(models).length, "models": models});
};

exports.delete = async (req, res) => {
    const result = await Helper.delete(DrawEntrantForm, [
        req.params.formId,
        req.params.entrantId,
    ]);
    Helper.sendResult(res, result);
}

exports.update = async (req, res) => {
    const id = [
        req.params.formId,
        req.params.entrantId,
    ];
    let data = {};
    await req.params.forEach((value, key) => {
        data[key] = value;
    });
    const result = await Helper.update(DrawEntrantForm, id, data);
    Helper.sendResult(res, result);
};
