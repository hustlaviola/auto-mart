import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

const dbConnection = () => {
  const { NODE_ENV } = process.env;
  let dbURL;
  if (NODE_ENV === 'test') {
    dbURL = process.env.DATABASE_TEST_URL;
  } else if (NODE_ENV === 'development') {
    dbURL = process.env.DATABASE_TEST_URL;
  } else {
    dbURL = process.env.DATABASE_URL;
  }
  return dbURL;
};

const connectionString = dbConnection();
const pool = new Pool({
  connectionString,
});

export default pool;
