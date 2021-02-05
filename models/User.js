const Sequelize = require("sequelize");

const sequelize = require("../db/mysql");

const User = sequelize.define("user", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	username: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	password: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
});

module.exports = User;
