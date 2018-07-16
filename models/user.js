'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING      
    },
    email: {
      type: DataTypes.STRING
    }
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Med, {as: 'meds', onDelete: 'CASCADE'});
    User.hasMany(models.Substance, {as: 'substances', onDelete: 'CASCADE'});
    User.hasMany(models.Dose_Time, {as: 'dose_times', onDelete: 'CASCADE'});
  };
  return User;
};