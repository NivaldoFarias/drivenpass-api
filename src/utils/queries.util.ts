import client from '../config/database';
import AppLog from '../events/AppLog';
import { Prisma } from '@prisma/client';

async function findUserById(id: number) {
  AppLog('Repository', 'User searched by id');

  return await client.users.findFirst({
    where: { id },
  });
}

async function createPassword(data: Prisma.passwordsCreateInput) {
  AppLog('Repository', 'Password instance inserted');

  return await client.passwords.create({ data, select: { id: true } });
}

export { findUserById, createPassword };
