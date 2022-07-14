import Cryptr from 'cryptr';

import * as queries from './../utils/queries.util';
import { env } from './../utils/constants.util';

async function processData(data: any, user_id: number) {
  const encrypted = encrypt(data.password);
  const { id: password_id } = await queries.createPassword({ key: encrypted });

  const output = {
    ...data,
    user_id,
    password_id,
  };
  delete output.password;

  return output;
}

//Local utils
function encrypt(password: string) {
  const cryptr = new Cryptr(env.CRYPTR_SECRET);
  return cryptr.encrypt(password);
}

export { encrypt, processData };
