'use strict';
module.exports = (sequelize, DataTypes) => {
  var Dose_Time = sequelize.define('Dose_Time', {
    time: {
      type: DataTypes.STRING,
      validate: {
        is: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/i
      }
    },
    dose: DataTypes.STRING,
   note: DataTypes.STRING
  }, {});
  Dose_Time.associate = function(models) {
    Dose_Time.belongsTo(models.Med, {onDelete: 'CASCADE'});
    //Dose_Time.belongsTo(models.User);//, {onDelete: 'CASCADE'});
  };
  return Dose_Time;
};