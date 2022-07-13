import { credentials } from '@prisma/client';

interface CredentialReqBody {
  label: string;
  username: string;
  password: string;
  url: string;
}

type CreateCredential = Omit<credentials, 'id' | 'created_at'>;

export { CredentialReqBody, CreateCredential };