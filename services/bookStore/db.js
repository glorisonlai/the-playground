import pg from "pg";

const dbConfig = {
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "password",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "postgres",
};

const client = new pg.Client(dbConfig);

/*
 * @param {string} query
 * @returns {Promise} Result of query
 */
export const query = async (query) => {
  await client.connect().catch((err) => {
    process.stderr.write("Error connecting to DB: " + err + "\n");
  });

  const res = await client.query(query);
  await client
    .end()
    .catch((err) =>
      process.stderr.write("Error closing connection: " + err + "\n"),
    );

  return res;
};

/*
 * @param {string} queryStr
 * @returns {Promise} Rows from query
 */
export const queryRows = async (queryStr) => {
  return (await query(queryStr)).rows;
};
