/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('adminActionsLog', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		userId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'user',
				key: 'id'
			},
			field: 'user_id'
		},
		timestamp: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'timestamp'
		},
		description: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'description'
		},
		pageUrl: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'page_url'
		},
		requestType: {
			type: DataTypes.STRING(10),
			allowNull: false,
			field: 'request_type'
		},
		data: {
			type: DataTypes.BLOB,
			allowNull: true,
			field: 'data'
		}
	}, {
		tableName: 'admin_actions_log'
	});
};
