const Sequelize = require("sequelize");

const sequelize = require("../db/mysql");

const User = sequelize.define("userdetails", {
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
	},
	mail: Sequelize.TEXT,
	gsmNumber: Sequelize.TEXT,
	tcNo: Sequelize.TEXT,
});

module.exports = User;
