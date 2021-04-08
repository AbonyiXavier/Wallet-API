module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Accounts', {
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    wallet_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Account.associate = (models) => {
    Account.belongsTo(models.Users, {
      as: 'user',
      foreignKey: 'userId',
      onDelete: 'cascade',
    });
  };
  return Account;
};
