'use strict';
module.exports = (sequelize, DataTypes) => {
  var Substance = sequelize.define('Substance', {
    rxnorm_id: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  Substance.associate = function(models) {
    Substance.belongsTo(models.Med);
    Substance.belongsTo(models.User);
  };
  return Substance;
};