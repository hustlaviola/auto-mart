import pool from '../config/database';
import createTablesQuery from './createTables/createTables';
import dropTablesQuery from './dropTables';

const queries = `${dropTablesQuery}${createTablesQuery}`;

pool.query(queries, () => {
  pool.end();
});
