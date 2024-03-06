"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("absentIns", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
          as: "userId",
        },
      },
      clock_in: {
        type: Sequelize.STRING,
      },
      latitude_in: {
        type: Sequelize.STRING,
      },
      longitude_in: {
        type: Sequelize.STRING,
      },
      selfie_in: {
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
    await queryInterface.dropTable("absentIns");
  },
};
