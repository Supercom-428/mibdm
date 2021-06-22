'use strict';

const DrawEntrant = require('../models').drawEntrant;
const DrawEntry = require('../models').drawEntries;
const Helper = require('../helpers/controller');
const formidable = require('formidable');

exports.create = async (req, res) => {
    const form = new formidable({multiples: true, uploadDir: __dirname});
    const result = await form.parse(req, async (err, fields, files) => {
        const model = DrawEntrant.build({
            companyId: fields.companyId,
            firstName: fields.firstName,
            lastName: fields.lastName,
            street1: fields.street1,
            street2: fields.street2,
            town: fields.town,
            county: fields.county,
            countryCode: fields.countryCode,
            postcode: fields.postcode,
            email: fields.email,
            phoneNumber: fields.phoneNumber,
            isFormCopiedAndSentToBusiness: fields.isFormCopiedAndSentToBusiness,
            isDrawNumbersSentToEntrant: fields.isDrawNumbersSentToEntrant,
            notes: fields.notes,
            payrollReference: fields.payrollReference,
            paymentFrequency: fields.paymentFrequency,
            paymentMethod: fields.paymentMethod,
            balance: fields.balance,
            isAddedToCrm: fields.isAddedToCrm,
            isConsentGivenToContactLineManager: fields.isConsentGivenToContactLineManager
        });
        await Helper.saveModel(model, res);

        const match = await DrawEntrant.findOne({
            where: {
                firstName: fields.firstName,
                lastName: fields.lastName,
                paymentMethod: fields.paymentMethod
            },
            include: [{all: true, nested: true}],
        });
    
        for (var i = 0; i < fields.howManyEntries; i++) {
            const model = DrawEntry.build({
                //entryNumber: req.body.entryNumber,
                entrantId: match.id,
                status: '0'
            });
    
            await Helper.saveModel(model, res);
        }
        Helper.sendResult(res, true, {"index" : match.id});
    });
};

exports.getById = async (req, res) => {
    const model = await Helper.getById(DrawEntrant, req.params.id);
    Helper.sendResult(res, true, {"count": Object.keys(model).length, "model": model});
};

/** @todo add support for filtering */
exports.getAll = async (req, res) => {
    const models = await DrawEntrant.findAll({include: [{all: true, nested: true}]});
    Helper.sendResult(res, true, {"count": Object.keys(models).length, "models": models});
};

exports.delete = async (req, res) => {
    const result = await Helper.delete(DrawEntrant, req.params.id);
    Helper.sendResult(res, result);
}

exports.update = async (req, res) => {
    const model = await Helper.getById(DrawEntrant, req.params.id);
    let data = {};

    const form = new formidable({multiples: true, uploadDir: __dirname});
    await form.parse(req, async (err, fields, files) => {
        data["companyId"] = fields.companyId,
        data["firstName"] = fields.firstName,
        data["lastName"] = fields.lastName,
        data["street1"] = fields.street1,
        data["street2"] = fields.street2,
        data["town"] = fields.town,
        data["county"] = fields.county,
        data["countryCode"] = fields.countryCode,
        data["postcode"] = fields.postcode,
        data["email"] = fields.email,
        data["phoneNumber"] = fields.phoneNumber,
        data["isFormCopiedAndSentToBusiness"] = fields.isFormCopiedAndSentToBusiness,
        data["isDrawNumbersSentToEntrant"] = fields.isDrawNumbersSentToEntrant,
        data["notes"] = fields.notes,
        data["payrollReference"] = fields.payrollReference,
        data["paymentFrequency"] = fields.paymentFrequency,
        data["paymentMethod"] = fields.paymentMethod,
        data["balance"] = fields.balance,
        data["isAddedToCrm"] = fields.isAddedToCrm,
        data["isConsentGivenToContactLineManager"] = fields.isConsentGivenToContactLineManager

        const result = await Helper.update(DrawEntrant, req.params.id, data);

        for (var i = 0; i < fields.addMoreEntries; i++) {
            const model = DrawEntry.build({
                entrantId: req.params.id,
                status: '0'
            });
    
            await Helper.saveModel(model, res);
        }

        Helper.sendResult(res, result);
    });
};

exports.options = async (req, res) => {
    const models = await DrawEntrant.findAll({include: [{all: true, nested: true}]});
    let options = [];
    models.forEach(model => {
        options.push({
            id: model.id,
            name: model.firstName + ' ' + model.lastName,
        });
    });
    Helper.sendResult(res, {options: options});
}
