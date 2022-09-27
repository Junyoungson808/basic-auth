'use strict';

const { sequelizeDatabase } = require("../server");

module.exports = (sequelizeDatabase)

const UsersModel = sequelizeDatabase.define('Users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

