import model from '../models';

export default class AccountController {
  static async getBalance(req, res) {
    try {
      const data = await model.Accounts.findAll({
        include: [
          {
            model: model.Users,
            as: 'user',
          },
        ],
      });
      return res.send({
        data,
        message: 'List of all Users',
      });
    } catch (error) {
      console.log('error', error);
      return res.status(500).send({ message: error.message });
    }
  }
}
