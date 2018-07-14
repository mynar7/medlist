'use strict';
module.exports = (sequelize, DataTypes) => {
  var RxNorm = sequelize.define('RxNorm', {
    rxnorm_id: DataTypes.STRING
  }, {});
  RxNorm.associate = function(models) {
    RxNorm.belongsTo(models.Med);
  };
  return RxNorm;
};