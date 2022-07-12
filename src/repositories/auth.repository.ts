import { User, UserRegister } from '../types/user';
import AppLog from '../events/AppLog';

import client from '../config/database';

async function register(registerData: UserRegister) {
  await client.users.create({
    data: registerData,
  });
  return AppLog('Repository', 'User instance created');
}

async function findByEmail(email: string) {
  const user = await client.users.findFirst({
    where: { email },
  });

  return user;
}

export { register, findByEmail };
