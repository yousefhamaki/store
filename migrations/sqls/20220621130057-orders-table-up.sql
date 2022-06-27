CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE orders (
    id uuid DEFAULT uuid_generate_v4()  PRIMARY KEY,
    user_id uuid REFERENCES users(id),
    status VARCHAR(15)
);
