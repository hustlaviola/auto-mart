const createFlagsTable = `
  CREATE TABLE IF NOT EXISTS flags(
    id SERIAL PRIMARY KEY NOT NULL,
    car_id INTEGER NOT NULL,
    created_on TIMESTAMP WITH TIME ZONE DEFAULT now(),
    reason VARCHAR(75) NOT NULL,
    description VARCHAR(750) NOT NULL,
    FOREIGN KEY (car_id) REFERENCES cars (id) ON DELETE CASCADE
  );
`;

export default createFlagsTable;
