import { notes } from '@prisma/client';

import client from '../config/database';
import AppLog from '../events/AppLog';

async function create(data: notes) {
  await client.notes.create({ data });
  return AppLog('Repository', 'Note instance inserted');
}

async function findUserByLabel(label: string, user_id: number) {
  AppLog('Repository', 'Note searched by label');

  return !!(await client.notes.findFirst({
    where: { label, user_id },
  }));
}

async function findAll(owner_id: number) {
  AppLog('Repository', 'Notes searched');

  return await client.notes.findMany({
    where: { user_id: owner_id },
  });
}

async function findById(id: number) {
  AppLog('Repository', 'Note searched by id');

  return await client.notes.findFirst({
    where: { id },
  });
}

async function deleteOne(id: number) {
  await client.notes.delete({ where: { id } });
  return AppLog('Repository', 'Note instance deleted');
}

export { create, findUserByLabel, findAll, findById, deleteOne };
