module.exports = (sequelize, DataTypes) => {
  const Gift = sequelize.define('Gifts', {
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Gift.associate = (models) => {
    Gift.belongsTo(models.Users, {
      as: 'user',
      foreignKey: 'userId',
      onDelete: 'cascade',
    });
    // Gift.belongsTo(models.Accounts, {
    //   as: 'account',
    //   foreignKey: 'accountId',
    //   onDelete: 'cascade',
    // });
  };
  return Gift;
};
