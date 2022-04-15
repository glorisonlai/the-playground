import { Client } from "pg";

export const postgresClient = async (dbName: string) => {
  console.log(process.env);
  const client = new Client({
    connectionString: dbName,
  });
  await client.connect();
  return client;
};
