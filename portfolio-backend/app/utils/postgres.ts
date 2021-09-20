import { Client } from "pg";

export const postgresClient = async (db_uri: string) => {
  const client = new Client({
    connectionString: db_uri,
  });
  await client.connect();
  return client;
};
