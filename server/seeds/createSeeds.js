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

const createCar = `
  INSERT INTO cars(owner,
    state,
    price,
    manufacturer,
    model,
    body_type)
  VALUES(1,
    'used',
    349956.45,
    'toyota',
    'yaris',
    'sedan')
  RETURNING *;
  
  INSERT INTO cars(owner,
    state,
    status,
    price,
    manufacturer,
    model,
    body_type)
  VALUES(2,
    'new',
    'sold',
    757644.44,
    'porsche',
    '911 carrera',
    'sedan')
  RETURNING *;

  INSERT INTO cars(owner,
    state,
    price,
    manufacturer,
    model,
    body_type)
  VALUES(2,
    'new',
    222990.65,
    'mcLaren',
    '720 s',
    'convertible')
  RETURNING *;
  `;

const createOrder = `
  INSERT INTO orders(buyer,
    car_id,
    amount)
  VALUES(3,
    2,
    9000.45)
  RETURNING *;
  
  INSERT INTO orders(buyer,
    car_id,
    status,
    amount)
  VALUES(2,
    1,
    'accepted',
    40000.45)
  RETURNING *;
  
  INSERT INTO orders(buyer,
    car_id,
    amount)
  VALUES(1,
    3,
    550000.45)
  RETURNING *;
`;

const createSeedsQuery = `${createUser}${createCar}${createOrder}`;

export default createSeedsQuery;
