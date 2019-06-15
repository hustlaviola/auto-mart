const dropUsersTable = 'DROP TABLE IF EXISTS users CASCADE; ';
const dropCarsTable = 'DROP TABLE IF EXISTS cars CASCADE; ';
const dropOrdersTable = 'DROP TABLE IF EXISTS orders CASCADE; ';

const dropTablesQuery = `${dropUsersTable}${dropCarsTable}${dropOrdersTable}`;

export default dropTablesQuery;
