/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const DrawEntry = sequelize.define('drawEntries', {
		entryNumber: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'entry_number'
		},
		entrantId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'draw_entrant',
				key: 'id'
			},
			field: 'entrant_id'
		}
	}, {
		tableName: 'draw_entries'
	});

	DrawEntry.associate = models => {
		DrawEntry.hasOne(models.drawEntrant, {sourceKey: 'entrantId', foreignKey: 'id', as: 'drawEntrant'})
		DrawEntry.hasMany(models.weeklyDrawEntries, {sourceKey: 'entryNumber', foreignKey: 'entryId'})
	};

	return DrawEntry;
};
