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
