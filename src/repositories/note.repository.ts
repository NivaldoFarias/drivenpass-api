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

export { create, findUserByLabel };
