import createUsersTable from './createUsersTable';
import createCarsTable from './createCarsTable';

const createTablesQuery = `${createUsersTable}${createCarsTable}`;

export default createTablesQuery;
