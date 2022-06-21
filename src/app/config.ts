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
  BCRYPT_PASSWORD,
  BCRYPT_ROUNDS,
  TOKEN_SECRET,
} = process.env;

export default {
  port: PORT,
  dbhost: PGHOST,
  dbuser: PGUSER,
  dbpass: PGPASSWORD,
  database: NODE_ENV === "dev" ? PGDATABASE : PGDATABASE_TEST,
  dbport: PGPORT,
  pcryptPass: BCRYPT_PASSWORD,
  pacryptRounds: BCRYPT_ROUNDS,
  secretToken: TOKEN_SECRET,
};
