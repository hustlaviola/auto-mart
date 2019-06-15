import createUsersTable from './createUsersTable';
import createCarsTable from './createCarsTable';
import createOrdersTable from './createOrdersTable';

const createTablesQuery = `${createUsersTable}${createCarsTable}${createOrdersTable}`;

export default createTablesQuery;
