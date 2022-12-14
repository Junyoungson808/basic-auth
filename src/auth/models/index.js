'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('./users-model');

const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite:memory'
  : process.env.DATABASE_URL;

const sequelizeDatabase = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const users = UserModel(sequelizeDatabase, DataTypes);
module.exports = { sequelizeDatabase, users };