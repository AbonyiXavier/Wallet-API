module.exports = (sequelize, DataTypes) => {
  const Withdraw = sequelize.define('Withdraws', {
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    account_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bank_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Withdraw.associate = (models) => {
    Withdraw.belongsTo(models.Users, {
      as: 'user',
      foreignKey: 'userId',
      onDelete: 'cascade',
    });
  };
  return Withdraw;
};
