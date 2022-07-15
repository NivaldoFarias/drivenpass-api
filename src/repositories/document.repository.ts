import { documents } from '@prisma/client';

import client from '../config/database';
import AppLog from '../events/AppLog';

async function create(data: documents) {
  await client.documents.create({ data });
  return AppLog('Repository', 'Document instance inserted');
}

async function findUserByLabel(label: string, user_id: number) {
  AppLog('Repository', 'Document searched by label');

  return !!(await client.documents.findFirst({
    where: { label, user_id },
  }));
}

async function findAll(owner_id: number) {
  AppLog('Repository', 'Documents searched');

  return await client.documents.findMany({
    where: { user_id: owner_id },
  });
}

async function findById(id: number) {
  AppLog('Repository', 'Document searched by id');

  return await client.documents.findFirst({
    where: { id },
  });
}

async function deleteOne(id: number) {
  await client.documents.delete({ where: { id } });
  return AppLog('Repository', 'Document instance deleted');
}

async function count() {
  return await client.documents.count();
}

export { create, findUserByLabel, findAll, findById, deleteOne, count };
