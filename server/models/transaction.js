module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transactions', {
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.Users, {
      as: 'user',
      foreignKey: 'userId',
      onDelete: 'cascade',
    });
  };
  return Transaction;
};
