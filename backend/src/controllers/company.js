'use strict';

const Company = require('../models').company;
const Helper = require('../helpers/controller');
const formidable = require('formidable');

exports.create = async (req, res) => {
    const form = new formidable({multiples: true, uploadDir: __dirname});
    const result = await form.parse(req, async (err, fields, files) => {
        const model = Company.build({
            name: fields.name,
            street1: fields.street1,
            street2: fields.street2,
            town: fields.town,
            county: fields.county,
            postcode: fields.postcode,
            countryCode: fields.countryCode,
            companyNumber: fields.companyNumber,
            phoneNumber: fields.phoneNumber,
            isPayroll: fields.isPayroll,
            payrollReconciliationType: fields.payrollReconciliationType,
            payrollReportName: fields.payrollReportName,
            isSupporter: fields.isSupporter,
            isPatron: fields.isPatron,
            notes: fields.notes,
        });
        await Helper.saveModel(model, res);

        const match = await Company.findOne({
            where: {
                name: fields.name,
                payrollReportName: fields.payrollReportName
            },
            include: [{all: true, nested: true}],
        });
        Helper.sendResult(res, true, {"index": match.id});
    });
};

exports.getById = async (req, res) => {
    const model = await Helper.getById(Company, req.params.id);
    Helper.sendResult(res, true, {"count": Object.keys(model).length, "model": model});
};

/** @todo add support for filtering */
exports.getAll = async (req, res) => {
    const models = await Company.findAll({include: [{all: true, nested: true}]});
    Helper.sendResult(res, true, {"count": Object.keys(models).length, "models": models});
};

exports.delete = async (req, res) => {
    const result = await Helper.delete(Company, req.params.id);
    Helper.sendResult(res, result);
}

exports.update = async (req, res) => {
    const model = await Helper.getById(Company, req.params.id);
    let data = {};

    const form = new formidable({multiples: true, uploadDir: __dirname});
    await form.parse(req, async (err, fields, files) => {
        data["name"] = fields.name,
        data["street1"] = fields.street1,
        data["street2"] = fields.street2,
        data["town"] = fields.town,
        data["county"] = fields.county,
        data["countryCode"] = fields.countryCode,
        data["postcode"] = fields.postcode,
        data["email"] = fields.email,
        data["phoneNumber"] = fields.phoneNumber,
        data["companyNumber"] = fields.companyNumber,
        data["isPayroll"] = fields.isPayroll,
        data["payrollReportName"] = fields.payrollReportName,
        data["payrollReconciliationType"] = fields.payrollReconciliationType,
        data["isSupporter"] = fields.isSupporter,
        data["isPatron"] = fields.isPatron,
        data["notes"] = fields.notes
        const result = await Helper.update(Company, req.params.id, data);
        Helper.sendResult(res, result);
    });
};

exports.options = async (req, res) => {
    const models = await Company.findAll({include: [{all: true, nested: true}]});
    let options = [];
    models.forEach(model => {
        options.push({
            id: model.id,
            name: model.name,
        });
    });
    Helper.sendResult(res, {options: options});
}
