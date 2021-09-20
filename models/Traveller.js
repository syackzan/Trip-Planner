const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Traveller model
class Traveller extends Model {}

// create fields/columns for Traveller model
Traveller.init(

);

module.exports = Traveller;
