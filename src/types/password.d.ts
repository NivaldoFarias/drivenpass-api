import { passwords } from '@prisma/client';

type CreatePassword = Omit<passwords, 'id' | 'created_at'>;

export { CreatePassword };
