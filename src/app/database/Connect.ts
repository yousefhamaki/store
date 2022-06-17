import { Pool } from "pg";
import config from "../config";

const pool = new Pool({
  host: config.dbhost,
  database: config.database,
  user: config.dbuser,
  password: config.dbpass,
  port: parseInt(config.dbport as string, 10),
  max: 4,
});

pool.on("error", (err: Error) => {
  console.error(err.message);
});

export default pool;
