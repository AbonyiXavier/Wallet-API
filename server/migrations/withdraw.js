module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
        Add altering commands here.
        Return a promise to correctly handle asynchronicity.

        Example:
        */
    return queryInterface.createTable('Withdraws', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      account_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bank_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
        Add reverting commands here.
        Return a promise to correctly handle asynchronicity.

        Example:
        */
    return queryInterface.dropTable('Withdraws');
  },
};
