import path from "path";
import { readFileSync } from "fs";
import Fastify from "fastify";
import serveStatic from "fastify-static";
import serveFavicon from "fastify-favicon";
import compress from "fastify-compress";
import helmet from "fastify-helmet";

import renderPage from "./renderPage";

const fastify = Fastify({
  http2: true,
  https: {
    key: readFileSync(path.join(__dirname, "/../certificate/key.pem")),
    cert: readFileSync(path.join(__dirname, "/../certificate/cert.pem"))
  },
  logger: {
    prettyPrint: true
  }
});

fastify
  .register(helmet)
  .register(compress)
  .register(serveFavicon, { path: path.join(__dirname, "public/favicons/") })
  .register(serveStatic, {
    root: path.join(__dirname, "public"),
    prefix: "/static/",
    maxAge: "1y"
  })
  .get("*", renderPage)
  .listen(1337);
