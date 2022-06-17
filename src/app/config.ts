import dotenv from "dotenv";

dotenv.config();

const {
  PORT,
  PGHOST,
  NODE_ENV,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,
  PGDATABASE_TEST,
  PGPORT,
} = process.env;

export default {
  port: PORT,
  dbhost: PGHOST,
  dbuser: PGUSER,
  dbpass: PGPASSWORD,
  database: NODE_ENV === "dev" ? PGDATABASE : PGDATABASE_TEST,
  dbport: PGPORT,
};
