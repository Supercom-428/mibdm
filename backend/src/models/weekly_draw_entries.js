/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const WeeklyDrawEntry = sequelize.define('weeklyDrawEntries', {
		entryId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'draw_entries',
				key: 'entry_number'
			},
			field: 'entry_id'
		},
		drawId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'weekly_draw',
				key: 'draw_id'
			},
			field: 'draw_id'
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0',
			field: 'status'
		},
		paymentId: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'payment_id'
		}
	}, {
		tableName: 'weekly_draw_entries'
	});

	WeeklyDrawEntry.associate = models => {
		WeeklyDrawEntry.hasOne(models.drawEntries, {sourceKey: 'entryId', foreignKey: 'entryNumber'});
		WeeklyDrawEntry.hasOne(models.weeklyDraw, {sourceKey: 'drawId', foreignKey: 'drawId'});
	};

	return WeeklyDrawEntry;
};
