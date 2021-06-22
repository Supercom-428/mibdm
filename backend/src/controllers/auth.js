'use strict';

const User = require('../models').user;
const Helper = require('../helpers/controller');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const formidable = require('formidable');

const secretKey = 'eS||he-3vN1!6N+)]qVQA3q{Sto?Q<hC';
const tokenExpiry = '24h';

exports.login = async (req, res) => {
    const form = new formidable({multiples: true, uploadDir: __dirname});
    form.parse(req, async (err, fields, files) => {
        if (err) {
            throw err;
        }

        const { username, password } = fields;
        const user = await User.findOne({
            where: {
                username: username,
            },
            include: [{all: true, nested: true}],
        });

        if (!user) {
            Helper.sendResult(res, false, {"message": "Unauthenticated"});
            return;
        }

        let permissions = [];
        console.log(user);
        await user.role.permissions.forEach(perm => {
            permissions.push(perm.code);
        });

        const tokenPayload = {
            userId: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role.description,
            permissions: permissions,
        };
        if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(tokenPayload, secretKey, {
                expiresIn: tokenExpiry
            });
            Helper.sendResult(res, true, {"token": token, "user": tokenPayload});
        } else {
            Helper.sendResult(res, false, {"message": "Unauthenticated"});
        }
    });
};
