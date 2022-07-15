import {
  users,
  notes,
  documents,
  credentials,
  credit_cards,
  networks,
} from '@prisma/client';

type Tables =
  | 'users'
  | 'notes'
  | 'documents'
  | 'credentials'
  | 'credit_cards'
  | 'networks';

type TablesModels =
  | users
  | notes
  | documents
  | credentials
  | credit_cards
  | networks;

export { Tables, TablesModels };
