const Sequelize = require("sequelize");

const sequelize = new Sequelize("pluscloud", "semih", "Password123!", {
	dialect: "mysql",
	host: "localhost",
	port: "3306",
});

module.exports = sequelize;
