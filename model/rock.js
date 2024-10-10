const { DataTypes } = require("sequelize");
const User = require("./user");
const sequelize = require("../config/databaseConfig");

const Rock = sequelize.define(
  "Rock",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    tableName: "rocks",
    timestamps: true,
  }
);

// Associations
User.hasMany(Rock, { foreignKey: "userId" }); // Define the one-to-many relationship
Rock.belongsTo(User, { foreignKey: "userId" }); // Define the many-to-one relationship

module.exports = Rock;
