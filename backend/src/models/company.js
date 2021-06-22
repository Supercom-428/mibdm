/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('company', {
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
			unique: true,
			field: 'name'
		},
		street1: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'street_1'
		},
		street2: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'street_2'
		},
		town: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'town'
		},
		county: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'county'
		},
		postcode: {
			type: DataTypes.STRING(10),
			allowNull: true,
			field: 'postcode'
		},
		countryCode: {
			type: DataTypes.STRING(3),
			allowNull: true,
			field: 'country_code'
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'email'
		},
		companyNumber: {
			type: DataTypes.STRING(10),
			allowNull: true,
			field: 'company_number'
		},
		phoneNumber: {
			type: DataTypes.STRING(60),
			allowNull: true,
			field: 'phone_number'
		},
		isPayroll: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0',
			field: 'is_payroll'
		},
		payrollReportName: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'payroll_report_name'
		},
		payrollReconciliationType: {
			type: DataTypes.STRING(20),
			allowNull: true,
			field: 'payroll_reconciliation_type'
		},
		isSupporter: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0',
			field: 'is_supporter'
		},
		isPatron: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0',
			field: 'is_patron'
		},
		notes: {
			type: DataTypes.BLOB,
			allowNull: true,
			field: 'notes'
		}
	}, {
		tableName: 'company'
	});
};
