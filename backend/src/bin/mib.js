#!/usr/local/bin/node
'use strict';
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const yargs = require('yargs');

fs
    .readdirSync(__dirname + '/cmd')
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const cmd = require(path.join(__dirname + '/cmd', file));
        yargs.command(cmd.code, cmd.description, cmd.options, cmd.command);
    })

const argv = yargs
    .help()
    .alias('help', 'h')
    .argv;

// User.build({
//
// });
