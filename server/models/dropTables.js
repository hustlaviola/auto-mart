const dropUsersTable = 'DROP TABLE IF EXISTS users CASCADE; ';
const dropCarsTable = 'DROP TABLE IF EXISTS cars CASCADE; ';

const dropTablesQuery = `${dropUsersTable}${dropCarsTable}`;

export default dropTablesQuery;
