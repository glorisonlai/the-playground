import { Client } from "pg";

export const postgresClient = async (dbName: string) => {
  const client = new Client({
    connectionString: "postgresql://postgres:9$2m2v42LqTL@localhost:5432",
  });
  await client.connect();
  return client;
};
