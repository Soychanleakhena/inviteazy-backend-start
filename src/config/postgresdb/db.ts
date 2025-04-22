import { Pool } from "pg";

export const connectPostgresDb = (): Pool => {
  const pool = new Pool({

    user: "postgres",
    host: "62.72.46.248",
    database: "Inviteazy_db",
    password: "NZt3C7DPfWnZyy8N",
    port: 5432,

  });
  return pool;
};

