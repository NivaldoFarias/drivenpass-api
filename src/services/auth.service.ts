import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { env } from '../utils/constants.util';
import AppLog from '../events/AppLog';

function hashPassword(password: string) {
  return bcrypt.hashSync(password, env.SALT_ROUNDS);
}

function generateToken(id: number) {
  const data = {};
  const subject = id.toString();
  const secretKey = env.JWT_SECRET;
  const expiresIn = env.JWT_EXPIRES_IN;
  const config = { expiresIn, subject };

  const token = jwt.sign(data, secretKey, config);

  AppLog('Service', 'Token generated');
  return token;
}

export { hashPassword, generateToken };
