'use strict';

const User = require('../models').user;
const Helper = require('../helpers/controller');
const formidable = require('formidable');

exports.create = async (req, res) => {
    const form = new formidable({multiples: true, uploadDir: __dirname});
    const result = await form.parse(req, async (err, fields, files) => {
        const model = User.build({
            username: fields.username,
            password: fields.password,
            firstName: fields.first_name,
            lastName: fields.last_name,
            emailAddress: fields.email,
            roleId: fields.role_id
        });

        return await Helper.saveModel(model, res);
    });

    Helper.sendResult(res, result);
};

exports.getById = async (req, res) => {
    const model = await Helper.getById(User, req.params.id);
    Helper.sendResult(res, true, {"count": Object.keys(models).length, "model": model});
};

/** @todo add support for filtering */
exports.getAll = async (req, res) => {
    console.log('getting list');
    const models = await User.findAll({include: [{all: true, nested: true}]});
    Helper.sendResult(res, true, {"count": Object.keys(models).length, "models": models});
};

exports.delete = async (req, res) => {
    const result = await Helper.delete(User, req.params.id);
    Helper.sendResult(res, result);
}

exports.update = async (req, res) => {
    const model = await Helper.getById(User, req.params.id);
    let data = {};
    await req.params.forEach((value, key) => {
        data[key] = value;
    });
    const result = await Helper.update(User, req.params.id, data);
    Helper.sendResult(res, result);
};
