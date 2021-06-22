/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const DrawEntrant = sequelize.define('drawEntrant', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		companyId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'company',
				key: 'id'
			},
			field: 'company_id'
		},
		firstName: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'first_name'
		},
		lastName: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'last_name'
		},
		street1: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'street_1'
		},
		street2: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'street_2'
		},
		town: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'town'
		},
		county: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'county'
		},
		countryCode: {
			type: DataTypes.STRING(3),
			allowNull: false,
			field: 'country_code'
		},
		postcode: {
			type: DataTypes.STRING(10),
			allowNull: false,
			field: 'postcode'
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'email'
		},
		phoneNumber: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'phone_number'
		},
		isFormCopiedAndSentToBusiness: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0',
			field: 'is_form_copied_and_sent_to_business'
		},
		isDrawNumbersSentToEntrant: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0',
			field: 'is_draw_numbers_sent_to_entrant'
		},
		notes: {
			type: DataTypes.BLOB,
			allowNull: true,
			field: 'notes'
		},
		payrollReference: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'payroll_reference'
		},
		paymentFrequency: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'payment_frequency'
		},
		paymentMethod: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'payment_method'
		},
		balance: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '0',
			field: 'balance'
		},
		isAddedToCrm: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0',
			field: 'is_added_to_crm'
		},
		isConsentGivenToContactLineManager: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0',
			field: 'is_consent_given_to_contact_line_manager'
		}
	}, {
		tableName: 'draw_entrant'
	});

	DrawEntrant.associate = models => {
		DrawEntrant.hasOne(models.company, {sourceKey: 'companyId', foreignKey: 'id'})
		DrawEntrant.hasMany(models.drawEntries, {sourceKey: 'id', foreignKey: 'entrantId'})
	};

	return DrawEntrant;
};
