'use strict';

const UploadedDocument = require('../models').uploadedDocuments;
const Helper = require('../helpers/controller');

exports.create = async (req, res) => {
    const model = UploadedDocument.build({
        filename: req.body.filename,
        pathToFile: req.body.pathToFile,
        engineId: req.body.engineId,
    });

    const result = await Helper.saveModel(model, res);
    Helper.sendResult(res, result);
};

exports.getById = async (req, res) => {
    const model = await Helper.getById(UploadedDocument, req.params.id);
    Helper.sendResult(res, true, {"count": Object.keys(models).length, "model": model});
};

/** @todo add support for filtering */
exports.getAll = async (req, res) => {
    const models = await UploadedDocument.findAll({include: [{all: true, nested: true}]});
    Helper.sendResult(res, true, {"count": Object.keys(models).length, "models": models});
};

exports.delete = async (req, res) => {
    const result = await Helper.delete(UploadedDocument, req.params.id);
    Helper.sendResult(res, result);
}

exports.update = async (req, res) => {
    const model = await Helper.getById(UploadedDocument, req.params.id);
    let data = {};
    await req.params.forEach((value, key) => {
        data[key] = value;
    });
    const result = await Helper.update(UploadedDocument, req.params.id, data);
    Helper.sendResult(res, result);
};
