import { CreateCredential } from '../types/credential';

import client from '../config/database';
import AppLog from '../events/AppLog';

async function create(createData: CreateCredential) {
  await client.credentials.create({
    data: createData,
  });
  return AppLog('Repository', 'Credential instance created');
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
