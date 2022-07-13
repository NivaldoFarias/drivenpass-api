import { notes } from '@prisma/client';

type CreateNote = Omit<notes, 'id' | 'created_at'>;

export { CreateNote };
