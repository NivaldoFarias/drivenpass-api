import { credit_cards } from '@prisma/client';

type CreateCreditCard = Omit<credit_cards, 'id' | 'created_at'>;

export { CreateCreditCard };
