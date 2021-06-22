/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('media', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'name'
		},
		contactName: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'contact_name'
		},
		contactEmail: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'contact_email'
		},
		contactNumber: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'contact_number'
		}
	}, {
		tableName: 'media'
	});
};
