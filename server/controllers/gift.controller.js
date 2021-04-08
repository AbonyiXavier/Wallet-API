import model from '../models';
const { sequelize } = model;

export default class GiftController {
  static async transferFund(req, res) {
    const t = await sequelize.transaction();
    try {
      const { wallet_id } = req.body;
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
      const { amount, description } = req.body;

      // checking user account amount against the one he wants to send
      if (amt < amount) {
        return res.status(403).json({
          message: 'oops! Oga your balance is low',
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

      // Check for user wallet he wants to send to(the receiver wallet id)
      const account = await model.Accounts.findOne({
        where: { wallet_id },
      });
      if (!account) {
        return res.status(403).json({
          message: 'sorry! no wallet id found',
        });
      }
      const { balance: bal } = account.dataValues;

      const money = parseFloat(bal);

      // Sum the money and update the account of the receiver
      const newBal = money + parseFloat(amount);

      await model.Accounts.update(
        {
          balance: newBal,
        },
        {
          where: {
            wallet_id,
          },
        },
        { transaction: t }
      );
      const data = {
        userId,
        wallet_id,
        amount: +amount,
        description,
      };
      await model.Gifts.create(data, { transaction: t });
      await t.commit();
      return res.json({
        data,
        message: 'Gift transfer successfully',
      });
    } catch (error) {
      await t.rollback();
      return res.status(500).send({ message: error.message });
    }
  }
}
