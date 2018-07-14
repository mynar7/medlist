'use strict';
module.exports = (sequelize, DataTypes) => {
  var Substance = sequelize.define('Substance', {
    name: DataTypes.STRING
  }, {});
  Substance.associate = function(models) {
    Substance.belongsTo(models.Med);
  };
  return Substance;
};