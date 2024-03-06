"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class absentOut extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      absentOut.belongsTo(models.absentIn, {
        as: "absentIn",
        foreignKey: "absent_id"
      });
    }
  }
  absentOut.init(
    {
      absent_id: DataTypes.INTEGER,
      clock_out: DataTypes.STRING,
      latitude_out: DataTypes.STRING,
      longitude_out: DataTypes.STRING,
      selfie_out: DataTypes.STRING,
      thumbnail_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "absentOut",
    }
  );
  return absentOut;
};
