import { credit_cards } from '@prisma/client';

import * as service from '../services/credit_card.service';

import client from '../config/database';
import AppLog from '../events/AppLog';

async function create(data: credit_cards) {
  await client.credit_cards.create({ data });
  return AppLog('Repository', 'Credit card instance inserted');
}

async function findAll(owner_id: number) {
  AppLog('Repository', 'Credit cards searched');

  const data = await client.credit_cards.findMany({
    where: { user_id: owner_id },
  });

  return service.processCards(data);
}

async function findById(id: number) {
  AppLog('Repository', 'Credit card searched by id');

  return await client.credit_cards.findFirst({
    where: { id },
  });
}

async function findUserByLabel(label: string, user_id: number) {
  AppLog('Repository', 'Credit card searched by label');

  return !!(await client.credit_cards.findFirst({
    where: { label, user_id },
  }));
}

async function deleteOne(id: number) {
  await client.credit_cards.delete({ where: { id } });
  return AppLog('Repository', 'Credit card instance deleted');
}

async function count() {
  return await client.credit_cards.count();
}

export { create, findById, findAll, findUserByLabel, deleteOne, count };
