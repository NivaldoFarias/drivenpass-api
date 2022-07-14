function processData(data: any, user_id: number) {
  return {
    ...data,
    user_id,
  };
}

function removePrivateNotes(data: any[], owner_id: number) {
  return data.filter((note: any) => {
    return note.user_id === owner_id;
  });
}

export { processData, removePrivateNotes };
