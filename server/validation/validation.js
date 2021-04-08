import joi from 'joi';
import createError from 'http-errors';
import model from '../models';
import AuthServices from '../helper/auth.services';
const { passwordCompare } = AuthServices;

export default class Validation {
  static async validateSignupDetails(req, res, next) {
    try {
      const schema = joi.object().keys({
        fullName: joi.string().min(6).max(255).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
      });
      await schema.validateAsync(req.body);
      return next();
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }
  }

  static async validateLoginDetails(req, res, next) {
    try {
      const schema = joi.object().keys({
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
      });
      await schema.validateAsync(req.body);
      return next();
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }
  }

  static async validatePassword(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await model.Users.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Invalid email/password combination.',
        });
      }
      const passwordMatch = await passwordCompare(user.password, password);

      if (!passwordMatch) {
        return res.status(401).json({
          error: 'Incorrect email/password combination.',
          success: false,
        });
      }
      return next();
    } catch (error) {
      console.log('error login', error.message);

      return res.status(500).json({
        message: error.message,
        error: 'There was an error. Please try again.',
        success: false,
      });
    }
  }
}
