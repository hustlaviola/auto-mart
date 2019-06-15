const createOrdersTable = `
  CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY NOT NULL,
    buyer INTEGER NOT NULL,
    car_id INTEGER NOT NULL,
    created_on TIMESTAMP WITH TIME ZONE DEFAULT now(),
    status VARCHAR(8) DEFAULT 'pending',
    amount FLOAT NOT NULL,
    updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
    FOREIGN KEY (buyer) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (car_id) REFERENCES cars (id) ON DELETE CASCADE
  );
`;

export default createOrdersTable;
