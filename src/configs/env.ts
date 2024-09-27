import dotenv from 'dotenv';

dotenv.config();

export const env = {
  node_env: process.env.NODE_ENV || 'development',
  database_url: process.env.DATABASE_URL || '',
  criptography_salt: Number(process.env.SALT_CRIPTOGRAPHY) || 8,
};
