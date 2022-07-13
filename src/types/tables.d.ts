import {
  users,
  notes,
  passwords,
  credentials,
  credit_cards,
  wifi_networks,
} from '@prisma/client';

type Tables =
  | 'users'
  | 'notes'
  | 'passwords'
  | 'credentials'
  | 'credit_cards'
  | 'wifi_networks';

type TablesModels =
  | users
  | notes
  | passwords
  | credentials
  | credit_cards
  | wifi_networks;

export { Tables, TablesModels };
