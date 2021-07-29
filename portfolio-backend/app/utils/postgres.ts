import { Client } from "pg";

export const postgresClient = (dbName: string) => {
  const client = new Client({
    connectionString: process.env.POSTGRES_DB_URI + dbName,
  });
  client.connect();
};
