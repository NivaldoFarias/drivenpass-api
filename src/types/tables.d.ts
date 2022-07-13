import {
  users,
  notes,
  passwords,
  credentials,
  credit_cards,
  networks,
} from '@prisma/client';

type Tables =
  | 'users'
  | 'notes'
  | 'passwords'
  | 'credentials'
  | 'credit_cards'
  | 'networks';

type TablesModels =
  | users
  | notes
  | passwords
  | credentials
  | credit_cards
  | networks;

export { Tables, TablesModels };
