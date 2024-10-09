const { Sequelize } = require("sequelize");

const database = new Sequelize("assignment_ssd", "root", "", {
  host: process.env.DB_HOST,
  dialect: "mysql",
  port: 3306,
});

module.exports = database;
