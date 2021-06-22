/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('drawForm', {
		formId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'form_id'
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'title'
		}
	}, {
		tableName: 'draw_form'
	});
};
