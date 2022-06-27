CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE product_orders (
    id uuid DEFAULT uuid_generate_v4()  PRIMARY KEY,
    product_id uuid REFERENCES products(id),
    order_id uuid REFERENCES orders(id),
    quantity integer
);
