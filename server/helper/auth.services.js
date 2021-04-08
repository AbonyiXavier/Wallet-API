import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const secretKey = process.env.JWT_KEY;

export default class AuthServices {
  static async generateJwt(payload, secret = secretKey) {
    const token = await jwt.sign({ payload }, secret, { expiresIn: '1d' });
    return token;
  }

  static async hashPassword(password) {
    const hashPass = await bcrypt.hash(password, bcrypt.genSaltSync(10));
    return hashPass;
  }

  static async passwordCompare(hashPassword, password) {
    const compareHash = bcrypt.compareSync(password, hashPassword);
    return compareHash;
  }

  static async verifyToken(token) {
    const vToken = jwt.verify(token, secretKey);
    return vToken;
  }
}
