import http from "http";
import { getBooks } from "./bookController.js";

const serverConfig = {
  hostname: "localhost",
  port: process.env.PORT || 8080,
  timeout: 200,
};

/**
 * @param {string} path
 * @param {string} method
 * @param {URLSearchParams} query
 * @param {string} payload
 * @param {http.ServerResponse} res
 */
const route = async (path, method, query, payload, res) => {
  try {
    switch (method) {
      case "GET": {
        const searchQuery = query.get("search");
        const catQuery = query.get("cat").split(",");
        const resRaw = await getBooks(searchQuery, catQuery);
        console.log("hello");
        const resJson = JSON.stringify(resRaw);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(resJson);
        res.end();
      }
      default: {
        res.statusCode = 404;
        res.end();
      }
    }
  } catch (err) {
    process.stderr.write(err.message + "\n");
    res.writeHead(500, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ error: err.message }));
    res.end();
  }
};

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
const handler = async (req, res) => {
  let payload = String.raw``;
  const query = new URLSearchParams(req.url.split("?")[1]);

  req.on("data", (chunk) => {
    payload += chunk;
  });

  req.on("end", () => {
    route(req.url, req.method, query, payload, res);
  });
};

http.createServer(handler).listen(serverConfig.port, () => {
  console.log(`App is running on port ${serverConfig.port}`);
});
