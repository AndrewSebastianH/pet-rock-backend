const crypto = require("crypto");
const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConfig");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    salt: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        user.salt = crypto.randomBytes(16).toString("hex");
        user.password = hashPassword(user.password, user.salt);
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.salt = crypto.randomBytes(16).toString("hex");
          user.password = hashPassword(user.password, user.salt);
        }
      },
    },
  }
);

function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 1000, 32, "sha256").toString("hex");
}

User.prototype.validatePassword = function (password) {
  const hashedPassword = hashPassword(password, this.salt);
  return this.password === hashedPassword;
};

module.exports = User;
