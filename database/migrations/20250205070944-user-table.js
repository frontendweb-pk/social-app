'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("users", {
      user_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      first_name: { type: Sequelize.STRING(50), allowNull: false },
      last_name: { type: Sequelize.STRING(50), allowNull: false },
      email: { type: Sequelize.STRING(30), allowNull: false, unique: true, validate: { isEmail: true } },
      password: { type: Sequelize.STRING(255), allowNull: false },
      mobile: { type: Sequelize.STRING(10), allowNull: false, unique: true },
      avatar: { type: Sequelize.JSONB, allowNull: true, defaultValue: null },
      access_token: { type: Sequelize.STRING, defaultValue: '', allowNull: true },
      email_verified: { type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false },
      role_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: "roles", key: "role_id" } },
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
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable("users")
  }
};
