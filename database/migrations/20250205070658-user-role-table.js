'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('roles', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("roles", {
      role_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      role_name: { type: Sequelize.STRING(30), allowNull: false, unique: true },
      active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('roles');
     */

    await queryInterface.dropTable("roles");
  }
};
