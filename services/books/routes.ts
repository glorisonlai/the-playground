import type http from "http";
import * as url from "url";

const Routes = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  LOGIN: "/login",
  REGISTER: "/register",
  NOT_FOUND: "/404",
};

const errorRes = (
  res: http.ServerResponse,
  statusCode: number,
  message: string,
) => {
  res.statusCode = statusCode;
  res.write(message);
  res.end();
};

const okRes = (res: http.ServerResponse, message: string) => {
  res.statusCode = 200;
  res.write(message);
  res.end();
};

const parseRequest = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
): string => {
  const pathname = parseUrl(req.url);
  return routeRequest(pathname, res);
};

const parseUrl = (reqUrl: string | undefined): string => {
  if (reqUrl == undefined) {
    return "";
  }

  return url.parse(reqUrl).pathname || "";
};

const routeRequest = (path: string, res: http.ServerResponse): string => {
  if (path == "/") {
    okRes(res, "Hello, World!");
  }
};

export { parseRequest };
