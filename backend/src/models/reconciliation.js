/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const Reconciliation = sequelize.define('reconciliation', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		reference: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'reference'
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'name'
		},
		drawEntrantId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'draw_entrant',
				key: 'id'
			},
			field: 'draw_entrant_id'
		},
		companyId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'company',
				key: 'id'
			},
			field: 'company_id'
		}
	}, {
		tableName: 'reconciliation'
	});

	Reconciliation.associate = models => {
		Reconciliation.hasOne(models.drawEntrant, {sourceKey: 'drawEntrantId', foreignKey: 'id'});
		Reconciliation.hasOne(models.company, {sourceKey: 'companyId', foreignKey: 'id'});
	};

	return Reconciliation;
};
