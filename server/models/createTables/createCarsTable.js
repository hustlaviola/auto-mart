const createCarsTable = `
  CREATE TABLE IF NOT EXISTS cars(
    id SERIAL PRIMARY KEY NOT NULL,
    owner INTEGER NOT NULL,
    created_on TIMESTAMP WITH TIME ZONE DEFAULT now(),
    image_url VARCHAR(1600),
    state VARCHAR(4) NOT NULL,
    status VARCHAR(9) DEFAULT 'available',
    price FLOAT NOT NULL,
    manufacturer VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    body_type VARCHAR(50) NOT NULL,
    updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
    FOREIGN KEY (owner) REFERENCES users (id) ON DELETE CASCADE
  );
`;

export default createCarsTable;
