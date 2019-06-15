import pool from '../models/database';
import createSeedsQuery from './createSeeds';
import dropTablesQuery from '../models/dropTables';
import createTablesQuery from '../models/createTables/createTables';

const queries = `${dropTablesQuery}${createTablesQuery}${createSeedsQuery}`;

pool.query(queries, () => {
  pool.end();
});
