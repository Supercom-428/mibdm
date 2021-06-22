'use strict';

const WeeklyDrawMedia = require('../models').weeklyDrawMedia;
const Helper = require('../helpers/controller');

exports.create = async (req, res) => {
    const model = WeeklyDrawMedia.build({
        mediaId: req.body.mediaId,
        drawId: req.body.drawId,
        dateSent: req.body.dateSent,
        datePublished: req.body.datePublished,
    });

    const result = await Helper.saveModel(model, res);
    Helper.sendResult(res, result);
};

exports.getById = async (req, res) => {
    const model = await Helper.getById(WeeklyDrawMedia, [
        req.params.mediaId,
        req.params.drawId,
    ]);
    Helper.sendResult(res, true, {"count": Object.keys(models).length, "model": model});
};

/** @todo add support for filtering */
exports.getAll = async (req, res) => {
    const models = await WeeklyDrawMedia.findAll({include: [{all: true, nested: true}]});
    Helper.sendResult(res, true, {"count": Object.keys(models).length, "models": models});
};

exports.delete = async (req, res) => {
    const result = await Helper.delete(WeeklyDrawMedia, [
        req.params.mediaId,
        req.params.drawId,
    ]);
    Helper.sendResult(res, result);
}

exports.update = async (req, res) => {
    let data = {};
    await req.params.forEach((value, key) => {
        data[key] = value;
    });
    const result = await Helper.update(WeeklyDrawMedia, req.params.id, data);
    Helper.sendResult(res, result);
};
