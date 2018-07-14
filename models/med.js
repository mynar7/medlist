'use strict';
module.exports = (sequelize, DataTypes) => {
  var Med = sequelize.define('Med', {
    openFDA_id: DataTypes.STRING,
    user_name: DataTypes.STRING,
    generic_name: DataTypes.STRING,
    brand_name: DataTypes.STRING
  }, {});
  Med.associate = function(models) {
    Med.belongsTo(models.User);
    Med.hasMany(models.RxNorm, {as: "rxnorms", onDelete: "CASCADE"});
    Med.hasMany(models.Substance, {as: "substances", onDelete: "CASCADE"});
    Med.hasMany(models.Dose_Time, {as: "dose_times", onDelete: "CASCADE"});
  };
  return Med;
};