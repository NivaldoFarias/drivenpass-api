import { Prisma } from '@prisma/client';

import client from '../config/database';
import AppLog from '../events/AppLog';

async function create(data: Prisma.credentialsCreateInput) {
  await client.credentials.create({ data });
  return AppLog('Repository', 'Credential instance inserted');
}

async function findById(id: number) {
  AppLog('Repository', 'Credential searched by id');

  return await client.credentials.findFirst({
    where: { id },
  });
}

async function findAll() {
  AppLog('Repository', 'Credential searched');

  return await client.credentials.findMany();
}

export { create, findById, findAll };
