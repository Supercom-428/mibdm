/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('permissions', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		code: {
			type: DataTypes.STRING(60),
			allowNull: false,
			field: 'code'
		},
		roleId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'role',
				key: 'id'
			},
			field: 'role_id'
		}
	}, {
		tableName: 'permissions'
	});
};
