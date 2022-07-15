function processData(data: any, user_id: number) {
  return {
    ...data,
    user_id,
  };
}

export { processData };
