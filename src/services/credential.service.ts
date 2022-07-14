import Cryptr from 'cryptr';
import { env } from './../utils/constants.util';

const CRYPTR = new Cryptr(env.CRYPTR_SECRET);

async function processData(data: any, user_id: number) {
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
    return processCredentialObject(credential);
  });
  return output;
}

function processCredentialObject(credential: any) {
  const output = {
    ...credential,
    password: CRYPTR.decrypt(credential.password),
  };
  delete output.user_id;

  return output;
}

function removePrivateCredentials(data: any[], owner_id: number) {
  return data.filter((credential: any) => {
    return credential.user_id === owner_id;
  });
}

export {
  processData,
  processCredentials,
  processCredentialObject,
  removePrivateCredentials,
};
