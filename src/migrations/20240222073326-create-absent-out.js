"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("absentOuts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      absent_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "absentIns",
          key: "id",
          as: "absentId",
        },
      },
      clock_out: {
        type: Sequelize.STRING,
      },
      latitude_out: {
        type: Sequelize.STRING,
      },
      longitude_out: {
        type: Sequelize.STRING,
      },
      selfie_out: {
        type: Sequelize.STRING,
      },
      thumbnail_id: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("absentOuts");
  },
};
