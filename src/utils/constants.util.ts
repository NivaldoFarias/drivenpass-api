import './../config/setup';

const env = {
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
};

const regex = {
  EMAIL:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  USERNAME: /^(?=.{3,24}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
};

const time = {
  CURRRENT_DATE: new Date().toISOString().slice(0, 19).replace('T', ' '),
  CURRENT_YEAR: new Date().getFullYear().toString().slice(2),
  CURRENT_MONTH: new Date().getMonth().toString(),
};

export { env, regex, time };
