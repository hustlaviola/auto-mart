import Helper from '../utils/Helper';

const hashed = Helper.hashPassword('vvvvvv');

const createUser = `
  INSERT INTO users(email,
    first_name,
    last_name,
    password,
    address)
  VALUES('viola1@mail.com',
    'Viola',
    'Violet',
    '${hashed}',
    'No 42, Anfield Road, Liverpool, England')
  RETURNING *;
  
  INSERT INTO users(email,
    first_name,
    last_name,
    password,
    address,
    is_admin)
  VALUES('viola2@mail.com',
    'Georgina',
    'Violet',
    '${hashed}',
    'No 42, Anfield Road, Liverpool, England',
    true)
  RETURNING *;

  INSERT INTO users(email,
    first_name,
    last_name,
    password,
    address)
  VALUES('viola3@mail.com',
    'Alexa',
    'Violet',
    '${hashed}',
    'No 42, Anfield Road, Liverpool, England')
  RETURNING *;

  INSERT INTO users(email,
    first_name,
    last_name,
    password,
    address)
  VALUES('viola4@mail.com',
    'Alexis',
    'Violet',
    '${hashed}',
    'No 42, Anfield Road, Liverpool, England')
  RETURNING *;

  INSERT INTO users(email,
    first_name,
    last_name,
    password,
    address)
  VALUES('viola5@mail.com',
    'John',
    'Violet',
    '${hashed}',
    'No 42, Anfield Road, Liverpool, England')
  RETURNING *;
`;

const createSeedsQuery = `${createUser}`;

export default createSeedsQuery;
