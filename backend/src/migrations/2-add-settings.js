'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "settings", deps: [user]
 *
 **/

var info = {
    "revision": 2,
    "name": "add-settings",
    "created": "2020-06-01T13:49:28.044Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "settings",
                {
                    "code": {
                        "type": Sequelize.STRING(60),
                        "field": "code",
                        "allowNull": false,
                        "primaryKey": true,
                    },
                    "userId": {
                        "type": Sequelize.INTEGER(11),
                        "field": "user_id",
                        "primaryKey": true,
                        "references": {
                            "model": "user",
                            "key": "id"
                        },
                        "allowNull": false
                    },
                    "settings": {
                        "type": Sequelize.BLOB,
                        "field": "settings",
                        "allowNull": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["settings", {
                transaction: transaction
            }]
        },
    ];
};

module.exports = {
    pos: 0,
    useTransaction: true,
    execute: function(queryInterface, Sequelize, _commands)
    {
        var index = this.pos;
        function run(transaction) {
            const commands = _commands(transaction);
            return new Promise(function(resolve, reject) {
                function next() {
                    if (index < commands.length)
                    {
                        let command = commands[index];
                        console.log("[#"+index+"] execute: " + command.fn);
                        index++;
                        queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                    }
                    else
                        resolve();
                }
                next();
            });
        }
        if (this.useTransaction) {
            return queryInterface.sequelize.transaction(run);
        } else {
            return run(null);
        }
    },
    up: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, migrationCommands);
    },
    down: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, rollbackCommands);
    },
    info: info
};
