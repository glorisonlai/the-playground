import * as http from "http";
import { parseRequest } from "./routes";

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  // Parse the request url
  parseRequest(req, res);
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
