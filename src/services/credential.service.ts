import Cryptr from 'cryptr';

import * as queries from './../utils/queries.util';
import { env } from './../utils/constants.util';

const CRYPTR = new Cryptr(env.CRYPTR_SECRET);

async function processData(data: any, user_id: number) {
  const encrypted = CRYPTR.encrypt(data.password);
  const { id: password_id } = await queries.createPassword({ key: encrypted });

  const output = {
    ...data,
    user_id,
    password_id,
  };
  delete output.password;

  return output;
}

function processCredentials(data: any) {
  const output = data.map((credential: any) => {
    delete credential.password_id;
    delete credential.user_id;
    credential.password = CRYPTR.decrypt(credential.password.key);

    return credential;
  });
  return output;
}

export { processData, processCredentials };
