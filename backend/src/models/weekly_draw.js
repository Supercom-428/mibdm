/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const WeeklyDraw = sequelize.define('weeklyDraw', {
		drawId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'draw_id'
		},
		date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			field: 'date'
		},
		winningEntryId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'draw_entries',
				key: 'entry_number'
			},
			field: 'winning_entry_id'
		},
		websitePositionNumber: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'website_position_number'
		},
		isBlogAddedToWebsite: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0',
			field: 'is_blog_added_to_website'
		},
		isVideoOnYoutube: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0',
			field: 'is_video_on_youtube'
		},
		isSocialMediaPosted: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0',
			field: 'is_social_media_posted'
		},
		isPrizeMoneyPaid: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0',
			field: 'is_prize_money_paid'
		},
		isMailshotSent: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0',
			field: 'is_mailshot_sent'
		},
		isConsentSignedForPhotoAndVideo: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0',
			field: 'is_consent_signed_for_photo_and_video'
		},
		isAddedToInstagram: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0',
			field: 'is_added_to_instagram'
		}
	}, {
		tableName: 'weekly_draw'
	});

	WeeklyDraw.associate = models => {
		WeeklyDraw.hasOne(models.drawEntries, {sourceKey: 'winningEntryId', foreignKey: 'entryNumber', as: 'winningEntry'});
	};

	return WeeklyDraw;
};
