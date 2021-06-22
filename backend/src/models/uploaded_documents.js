/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('uploadedDocuments', {
		documentId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'document_id'
		},
		filename: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'filename'
		},
		pathToFile: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'path_to_file'
		},
		engineId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'engine_id'
		}
	}, {
		tableName: 'uploaded_documents'
	});
};
