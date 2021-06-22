'use strict';

const WeeklyDraw = require('../models').weeklyDraw;
const WeeklyDrawEntries = require('../models').weeklyDrawEntries
const Helper = require('../helpers/controller');

const formidable = require('formidable');

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

exports.create = async (req, res) => {
    const model = WeeklyDraw.build({
        date: req.body.date,
        winningEntryId: req.body.winningEntryId,
        websitePositionNumber: req.body.websitePositionNumber,
        isBlogAddedToWebsite: req.body.isBlogAddedToWebsite,
        isVideoOnYoutube: req.body.isVideoOnYoutube,
        isSocialMediaPosted: req.body.isSocialMediaPosted,
        isPrizeMoneyPaid: req.body.isPrizeMoneyPaid,
        isMailshotSent: req.body.isMailshotSent,
        isConsentSignedForPhotoAndVideo: req.body.isConsentSignedForPhotoAndVideo,
        isAddedToInstagram: req.body.isAddedToInstagram,
    });

    const result = await Helper.saveModel(model, res);
    Helper.sendResult(res, result);
};

exports.getById = async (req, res) => {
    const model = await Helper.getById(WeeklyDraw, req.params.id);
    Helper.sendResult(res, true, {"count": Object.keys(model).length, "model": model});
};

/** @todo add support for filtering */
exports.getAll = async (req, res) => {
    const models = await WeeklyDraw.findAll({include: [{all: true, nested: true}]});
    Helper.sendResult(res, true, {"count": Object.keys(models).length, "models": models});
};

exports.delete = async (req, res) => {
    const result = await Helper.delete(WeeklyDraw, req.params.id);
    Helper.sendResult(res, result);
}

exports.update = async (req, res) => {
    const model = await Helper.getById(WeeklyDraw, req.params.id);
    let data = {};
    await req.params.forEach((value, key) => {
        data[key] = value;
    });
    const result = await Helper.update(WeeklyDraw, req.params.id, data);
    Helper.sendResult(res, result);
};

exports.getNextDraw = async (req, res) => {
    let draw = await WeeklyDraw.findOne({
        where: {
            winningEntryId: null
        }
    });
    let result = true;

    if (draw === null) {
        result = false;
        const date = new Date();
        const model = WeeklyDraw.build({
            date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
        });

        result = await Helper.saveModel(model, res);
        if (result === true) {
            draw = await WeeklyDraw.findOne({
                where: {
                    winningEntryId: null
                }
            });

            await sequelize.query('INSERT INTO weekly_draw_entries SELECT entry_number, ' + draw.drawId + ' , 0, 0, now(), now() from draw_entries');
        }
    }
    Helper.sendResult(res, result, {draw: draw.dataValues});
};

exports.generateWinner = async (req, res) => {

    const form = new formidable({multiples: true, uploadDir: __dirname});
    form.parse(req, async (err, fields, files) => {
        const drawId = fields.drawId;
        const winner = await WeeklyDrawEntries.findOne({
            where: {
                drawId: drawId,
            },
            order: Sequelize.literal('rand()'),
            include: [{all: true, nested: true}]
        });

        let draw = await Helper.getById(WeeklyDraw, drawId);

        let drawData = draw.get();
        drawData.winningEntryId = winner.entryId;
        let result = false;
        try {
            await WeeklyDraw.upsert(drawData)
            result = true;
        } catch (e) {
            console.log(e);
        }
        // const result = await Helper.update(WeeklyDraw, req.body.drawId, data);
        if (result) {
            draw = await Helper.getById(WeeklyDraw, drawId);
        }
        Helper.sendResult(res, result, {draw: draw});
    });
};
