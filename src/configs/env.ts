import dotenv from 'dotenv';
import path from 'path';

const enverimont = process.env.NODE_ENV || 'development';

switch (enverimont.toLowerCase()) {
  case 'production':
    dotenv.config({ path: path.join(__dirname, '../../.env.production') });
    break;
  case 'test':
    dotenv.config({ path: path.join(__dirname, '../../.env.test') });
    break;
  default:
    dotenv.config({ path: path.join(__dirname, '../../.env') });
    break;
}

dotenv.config();

export const env = {
  node_env: process.env.NODE_ENV || 'development',
  database_url: process.env.DATABASE_URL || '',
  criptography_salt: Number(process.env.SALT_CRIPTOGRAPHY) || 8,
};
