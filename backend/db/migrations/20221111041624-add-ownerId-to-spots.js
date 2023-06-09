'use strict';

let options = {};
options.tableName = 'Spots'; // define your table name in options object

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn(options,'ownerId',
      {
        type: Sequelize.INTEGER,
        references: { model: 'Users' },
        onDelete: 'CASCADE', // not necessary
        allowNull: false, // not necessary
      },
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeColumn(options,'ownerId');
  }
};
