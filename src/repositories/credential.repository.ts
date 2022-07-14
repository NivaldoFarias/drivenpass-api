import { Prisma } from '@prisma/client';

import * as service from '../services/credential.service';

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

  const data = await client.credentials.findMany();

  return service.processCredentials(data);
}

async function findUserByLabel(label: string, user_id: number) {
  AppLog('Repository', 'Credential searched by label');

  return !!(await client.credentials.findFirst({
    where: { label, user_id },
  }));
}

async function deleteOne(id: number) {
  await client.credentials.delete({ where: { id } });
  return AppLog('Repository', 'Credential instance deleted');
}

export { create, findById, findAll, findUserByLabel, deleteOne };
