import Cryptr from 'cryptr';
import { env } from './../utils/constants.util';
import AppLog from '../events/AppLog';

const CRYPTR = new Cryptr(env.CRYPTR_SECRET);

function processData(data: any, user_id: number) {
  AppLog('Service', 'Password and CVC encrypted');
  const encryptedPassword = CRYPTR.encrypt(data.password);
  const encryptedCVC = CRYPTR.encrypt(data.cvc);

  return {
    ...data,
    user_id,
    password: encryptedPassword,
    cvc: encryptedCVC,
  };
}

function processCards(data: any) {
  AppLog('Service', 'Credit cards processed');

  return data.map((credit_card: any) => {
    return processObject(credit_card);
  });
}

function processObject(credit_card: any) {
  return {
    ...credit_card,
    password: CRYPTR.decrypt(credit_card.password),
    cvc: CRYPTR.decrypt(credit_card.cvc),
  };
}

export { processData, processCards, processObject };
