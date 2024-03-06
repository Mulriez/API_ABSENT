"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class absentIn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      absentIn.hasMany(models.absentOut, {
        as: "absentOut",
        foreignKey: "absent_id",
      });
      absentIn.belongsTo(models.user, {
        as: "user",
        foreignKey: "user_id",
      });
    }
  }
  absentIn.init(
    {
      user_id: DataTypes.INTEGER,
      clock_in: DataTypes.STRING,
      latitude_in: DataTypes.STRING,
      longitude_in: DataTypes.STRING,
      selfie_in: DataTypes.STRING,
      thumbnail_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "absentIn",
    }
  );
  return absentIn;
};
