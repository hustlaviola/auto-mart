const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(70) UNIQUE NOT NULL,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    password VARCHAR(60) NOT NULL,
    address VARCHAR(255),
    is_admin BOOLEAN DEFAULT false,
    updated TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
`;

export default createUsersTable;
