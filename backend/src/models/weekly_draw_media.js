/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const WeeklyDrawMedia = sequelize.define('weeklyDrawMedia', {
		mediaId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'media',
				key: 'id'
			},
			field: 'media_id'
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
		dateSent: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'date_sent'
		},
		datePublished: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'date_published'
		}
	}, {
		tableName: 'weekly_draw_media'
	});

	WeeklyDrawMedia.associate = models => {
		WeeklyDrawMedia.hasOne(models.media, {sourceKey: 'mediaId', foreignKey: 'id'});
		WeeklyDrawMedia.hasOne(models.weeklyDraw, {sourceKey: 'drawId', foreignKey: 'drawId'});
	};

	return WeeklyDrawMedia;
};
