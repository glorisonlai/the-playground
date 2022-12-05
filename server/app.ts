import express from "express";
import httpProxy from "http-proxy";

const app = express();
const apiProxy = httpProxy.createProxyServer();
const serverOne = "http://localhost:3001",
  ServerTwo = "http://localhost:3002",
  ServerThree = "http://localhost:3002";

app.use();

app.all("/app1/*", function (req, res) {
  console.log("redirecting to Server1");
  apiProxy.web(req, res, { target: serverOne });
});

app.all("/app2/*", function (req, res) {
  console.log("redirecting to Server2");
  apiProxy.web(req, res, { target: ServerTwo });
});

app.all("/app2/*", function (req, res) {
  console.log("redirecting to Server3");
  apiProxy.web(req, res, { target: ServerThree });
});

app.listen(3000);
