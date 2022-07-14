import { networks } from '@prisma/client';

import * as service from '../services/network.service';

import client from '../config/database';
import AppLog from '../events/AppLog';

async function create(data: networks) {
  await client.networks.create({ data });
  return AppLog('Repository', 'Network instance inserted');
}

async function findUserByLabel(label: string, user_id: number) {
  AppLog('Repository', 'Network searched by label');

  return !!(await client.networks.findFirst({
    where: { label, user_id },
  }));
}

async function findAll(owner_id: number) {
  AppLog('Repository', 'Notes searched');

  const data = await client.networks.findMany({
    where: { user_id: owner_id },
  });

  return service.processNetworks(data);
}

async function findById(id: number) {
  AppLog('Repository', 'Network searched by id');

  return await client.networks.findFirst({
    where: { id },
  });
}

async function deleteOne(id: number) {
  await client.networks.delete({ where: { id } });
  return AppLog('Repository', 'Network instance deleted');
}

export { create, findUserByLabel, findAll, findById, deleteOne };
