const dropUsersTable = 'DROP TABLE IF EXISTS users CASCADE; ';
const dropCarsTable = 'DROP TABLE IF EXISTS cars CASCADE; ';
const dropOrdersTable = 'DROP TABLE IF EXISTS orders CASCADE; ';
const dropFlagsTable = 'DROP TABLE IF EXISTS flags CASCADE; ';

const dropTablesQuery = `${dropUsersTable}${dropCarsTable}
  ${dropOrdersTable}${dropFlagsTable}`;

export default dropTablesQuery;
