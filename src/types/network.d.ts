import { wifi_networks } from '@prisma/client';

type CreateNetwork = Omit<wifi_networks, 'id' | 'created_at'>;

export { CreateNetwork };
