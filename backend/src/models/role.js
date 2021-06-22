/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const Role = sequelize.define('role', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		description: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'description'
		}
	}, {
		tableName: 'role'
	});

	Role.associate = function(models) {
		Role.hasMany(models.permissions, {foreignKey: 'roleId'});
	};

	return Role;
};
