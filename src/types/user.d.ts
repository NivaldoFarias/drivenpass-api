import { users } from '@prisma/client';

type RegisterUser = Omit<users, 'id' | 'created_at'>;

export { RegisterUser };
