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

function processCredentials(data: any) {
  const output = data.map((credential: any) => {
    return processObject(credential);
  });
  return output;
}

function processObject(credential: any) {
  return {
    ...credential,
    password: CRYPTR.decrypt(credential.password),
  };
}

export { processData, processCredentials, processObject };
