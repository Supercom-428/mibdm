'use strict';

const WeeklyDrawEntry = require('../models').weeklyDrawEntries;
const DrawEntry = require('../models').drawEntries;
const Helper = require('../helpers/controller');
const formidable = require('formidable');

exports.create = async (req, res) => {
    const form = new formidable({multiples: true, uploadDir: __dirname});
    const result = await form.parse(req, async (err, fields, files) => {
        const model = WeeklyDrawEntry.build({
            entryId: fields.entryId,
            drawId: fields.drawId,
            status: '1',
            paymentId: '',
        });
        await Helper.saveModel(model, res);
    });
    Helper.sendResult(res, result);
};

exports.getById = async (req, res) => {
    const model = await Helper.getById(WeeklyDrawEntry, [
        req.params.entryId,
        req.params.drawId,
    ]);
    Helper.sendResult(res, true, {"count": Object.keys(models).length, "model": model});
};

/** @todo add support for filtering */
exports.getAll = async (req, res) => {
    const models = await WeeklyDrawEntry.findAll({include: [{all: true, nested: true}]});
    Helper.sendResult(res, true, {"count": Object.keys(models).length, "models": models});
};

exports.delete = async (req, res) => {
    const record = await WeeklyDrawEntry.findOne({
        where: {
            entryId: req.params.entryId,
            drawId: req.params.drawId
        },
        include: [{all: true, nested: true}],
    });
    
    let result = false;
    try {
        await record.destroy();
        result = true;
    } catch (e) {
        console.log(e);
    }
    Helper.sendResult(res, result);
}

exports.update = async (req, res) => {
    
    const records = await WeeklyDrawEntry.findAll({
        where: {
            entryId: req.params.entryId
        },
        include: [{all: true, nested: true}],
    });

    const entry = await DrawEntry.findOne({
        where: {
            entryNumber: req.params.entryId
        },
        include: [{all: true, nested: true}],
    });

    entry.status = '2';
    await Helper.saveModel(entry, res);

    await records.forEach(async record => {
        record.status = '2';
        await Helper.saveModel(record, res);
    });

    Helper.sendResult(res, true);
};
