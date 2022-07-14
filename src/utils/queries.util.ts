import client from '../config/database';
import AppLog from '../events/AppLog';

async function findUserById(id: number) {
  AppLog('Repository', 'User searched by id');

  return await client.users.findFirst({
    where: { id },
  });
}

export { findUserById };
