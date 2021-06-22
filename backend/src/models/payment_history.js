/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const PaymentHistory = sequelize.define('paymentHistory', {
		paymentId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'payment_id'
		},
		date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			field: 'date'
		},
		documentId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'uploaded_documents',
				key: 'document_id'
			},
			field: 'document_id'
		},
		description: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'description'
		},
		amount: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '0',
			field: 'amount'
		}
	}, {
		tableName: 'payment_history'
	});

	PaymentHistory.associate = models => {
		PaymentHistory.hasOne(models.uploadedDocuments, {sourceKey: 'documentId', foreignKey: 'documentId'})
	};

	return PaymentHistory;
};
