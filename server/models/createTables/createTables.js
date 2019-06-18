import createUsersTable from './createUsersTable';
import createCarsTable from './createCarsTable';
import createOrdersTable from './createOrdersTable';
import createFlagsTable from './createFlagsTable';

const createTablesQuery = `${createUsersTable}${createCarsTable}
  ${createOrdersTable}${createFlagsTable}`;

export default createTablesQuery;
