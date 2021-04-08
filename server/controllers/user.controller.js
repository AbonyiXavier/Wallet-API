import express from 'express';
import bcrypt from 'bcryptjs';
import shortid from 'shortid';
import model from '../models';
import AuthServices from '../helper/auth.services';
const { generateJwt } = AuthServices;

export default class UserController {
  static async signup(req, res) {
    try {
      const checkEmail = await model.Users.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (checkEmail) {
        return res.status(400).send({
          message: 'Email already used by another user.',
        });
      }
      const userData = await model.Users.create({
        fullName: req.body.fullName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        // wallet_id: shortid.generate(),
      });

      const token = await generateJwt(userData);
      console.log('token', token);
      const data = {
        id: userData.id,
        fullName: userData.fullName,
        email: userData.email,
        // wallet_id: userData.wallet_id,
      };
      data.token = token;

      const balance = 0;
      await model.Accounts.create({
        balance: parseFloat(balance),
        userId: data.id,
        wallet_id: shortid.generate(),
      });
      res.cookie('token', token);
      return res.header('Authorization', token).status(200).send({
        data,
        message: 'User was registered successfully!',
      });
    } catch (err) {
      console.log('err', err);
      return res.status(500).send({ message: err.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await model.Users.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return res.status(404).send({
          message: 'User Not found.',
        });
      }
      const token = await generateJwt(user);
      const data = {
        id: user.id,
        email: user.email,
      };
      data.token = token;
      res.cookie('token', token);
      return res.header('Authorization', token).status(200).send({
        data,
        message: 'logged in!',
      });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const data = await model.Users.findAll({
        include: [
          {
            model: model.Accounts,
          },
        ],
      });

      return res.send({
        data,
        message: 'List of all Users',
      });
    } catch (err) {
      console.log('err', err);
      return res.status(500).send({ message: err.message });
    }
  }
}
