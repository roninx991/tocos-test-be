import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT ?? 3001;
export const MONGODB_URI =
  process.env.MONGODB_URI ?? 'mongodb://localhost:27017/tocos';
export const HOSTNAME = process.env.HOSTNAME ?? 'localhost';
