import Cryptr from 'cryptr';
import { env } from './../utils/constants.util';

const CRYPTR = new Cryptr(env.CRYPTR_SECRET);

function processData(data: any, user_id: number) {
  const encrypted = CRYPTR.encrypt(data.password);
  const output = {
    ...data,
    user_id,
    password: encrypted,
  };

  return output;
}

function processNetworks(data: any) {
  const output = data.map((network: any) => {
    return processObject(network);
  });
  return output;
}

function processObject(network: any) {
  return {
    ...network,
    password: CRYPTR.decrypt(network.password),
  };
}

export { processData, processObject, processNetworks };
