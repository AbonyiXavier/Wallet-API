import model from '../models';
const { sequelize } = model;

export default class WithdrawController {
  static async sendToAccount(req, res) {
    const t = await sequelize.transaction();
    try {
      const { account_number } = req.body;
      const { id: userId } = req.user.payload;
      const user = await model.Users.findOne({
        where: {
          id: req.user.payload.id,
        },
      });
      if (!user) {
        return res.json({
          message: 'No user found',
        });
      }
      // Get user balance
      const accountDetails = await model.Accounts.findOne({
        where: { userId: req.user.payload.id },
      });
      const { balance } = accountDetails.dataValues;

      const amt = parseFloat(balance);
      const { amount, bank } = req.body;

      // checking user account amount against the one he wants to send
      if (amt < amount) {
        return res.status(403).json({
          message: 'insufficient fund',
        });
      }

      // subtract user amount from his wallet to what he/she is sending and update his/her account
      const newBalance = amt - parseFloat(amount);

      await model.Accounts.update(
        {
          balance: newBalance,
        },
        {
          where: {
            userId,
          },
        },
        { transaction: t }
      );

      // Check if user exist
      const account = await model.Accounts.findOne({
        where: { userId },
      });
      if (!account) {
        return res.status(403).json({
          message: 'sorry! no such account found',
        });
      }
      const { balance: bal } = account.dataValues;

      const money = parseFloat(bal);

      // Sum the money and update the amount of the bank account you are sending to
      const newBal = money + parseFloat(amount);

      await model.Withdraws.update(
        {
          amount: newBal,
        },
        {
          where: {
            account_number,
          },
        },
        { transaction: t }
      );
      const data = {
        userId,
        account_number,
        amount: +amount,
        bank,
      };
      await model.Withdraws.create(data, { transaction: t });
      await t.commit();
      return res.json({
        data,
        message: 'send money to account was successful',
      });
    } catch (error) {
      await t.rollback();
      return res.status(500).send({ message: error.message });
    }
  }

  static async withdrawHistory(req, res) {
    try {
      const withdraw = await model.Withdraws.findAll({
        include: [
          {
            model: model.Users,
            as: 'user',
          },
        ],
      });
      return res.json({
        withdraw,
        message: 'Withdraw History',
      });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
}
