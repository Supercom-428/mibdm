/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const DrawEntrantForm = sequelize.define('drawEntrantForm', {
		formId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'draw_entrant',
				key: 'id'
			},
			field: 'form_id'
		},
		entrantId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'draw_entrant',
				key: 'id'
			},
			field: 'entrant_id'
		},
		dateSent: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'date_sent'
		},
		dateReceived: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'date_received'
		},
		dateCopyReturned: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'date_copy_returned'
		}
	}, {
		tableName: 'draw_entrant_form'
	});

	DrawEntrantForm.associate = models => {
		DrawEntrantForm.hasOne(models.drawForm, {sourceKey: 'formId', foreignKey: 'formId'});
		DrawEntrantForm.hasOne(models.drawEntrant, {sourceKey: 'entrantId', foreignKey: 'id'});
	};

	return DrawEntrantForm;
};
