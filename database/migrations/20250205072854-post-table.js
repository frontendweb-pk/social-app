'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('posts', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("posts", {
      post_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      content: { type: Sequelize.TEXT, allowNull: false },
      media: { type: Sequelize.ARRAY(Sequelize.JSONB), allowNull: true, defaultValue: null },
      user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: "users", key: "user_id" } },
      status: { type: Sequelize.ENUM("draft", "private", "publish", "friends"), defaultValue: "draft", allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('posts');
     */

    await queryInterface.dropTable("posts")
  }
};
