/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('settings', {
        code: {
            type: DataTypes.STRING(60),
            allowNull: false,
            primaryKey: true,
            field: 'code'
        },
        userId: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            },
            field: 'user_id'
        },
        settings: {
            allowNull: true,
            field: "settings",
            type: DataTypes.BLOB,
        },
    }, {
        tableName: 'settings',
    });
};
