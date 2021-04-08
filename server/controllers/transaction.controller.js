import model from '../models';
const { sequelize } = model;
const { initializePayment, verifyPayment } = require('../helper/paystack');

export default class TransactionController {
  static async fundWallet(req, res) {
    const t = await sequelize.transaction();

    try {
      const { amount } = req.body;
      if (parseFloat(amount) < 50) {
        console.log('fund your wallet with at least ₦50.');
        return res
          .status(400)
          .send({ message: 'fund your wallet with at least ₦50.' });
      }
      const paystack_data = {
        amount: parseFloat(amount) * 100,
        email: req.user.payload.email,
      };

      const response = await initializePayment(paystack_data, {
        transaction: t,
      });
      const transation_payload = {
        userId: req.user.payload.id,
        amount: parseFloat(amount),
        reference: response.data.reference,
        status: 'pending',
      };

      const payload = await model.Transactions.create(transation_payload);
      if (response) {
        return res.json({
          paystackAuthorizationUrl: response.data.authorization_url,
          payload,
        });
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      return res.status(500).send({ message: error.message });
    }
  }

  static async getVerifyWallet(req, res) {
    const t = await sequelize.transaction();

    const { trxref } = req.query;

    if (!trxref) {
      console.log('No transaction reference found');
    }

    try {
      const payment_status = await verifyPayment(trxref);

      const { status, reference, amount, customer } = payment_status.data.data;
      const { email } = customer;

      const user = await model.Users.findOne({ where: { email } });

      const { id: userId } = user.dataValues;

      const accountDetails = await model.Accounts.findOne({
        where: { userId },
      });
      const { balance } = accountDetails.dataValues;
      const amt = amount / 100;
      const newBalance = parseFloat(balance) + amt;

      await model.Transactions.create(
        {
          userId,
          status,
          reference,
          amount: amt,
        },
        {
          transaction: t,
        }
      );
      await model.Accounts.update(
        {
          balance: newBalance,
        },
        {
          where: {
            userId,
          },
        },
        {
          transaction: t,
        }
      );
      return res.json({
        message: 'Account funded successfully',
      });
    } catch (error) {
      console.log('error', error);
      return res.status(500).send({ message: error.message });
    }
  }
}
