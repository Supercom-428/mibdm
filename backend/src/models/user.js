/* jshint indent: 1 */
const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
	const User = sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		username: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
			field: 'username'
		},
		password: {
			type: DataTypes.STRING(100),
			allowNull: false,
			field: 'password'
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
		emailAddress: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'email_address'
		},
		roleId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'role',
				key: 'id'
			},
			field: 'role_id'
		},
	}, {
		tableName: 'user',
		hooks: {
			beforeCreate(user) {
				user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
			// },
			// validPassword(password) {
			// 	return bcrypt.compare(password, this.password);
			}
		}
	});

	User.associate = models => {
		User.hasOne(models.role, {sourceKey: 'roleId', foreignKey: 'id'})
	};

	return User;
};
