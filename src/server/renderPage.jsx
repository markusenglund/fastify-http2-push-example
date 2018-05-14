import { readFileSync } from "fs";
import path from "path";
import { h } from "preact";
import renderToString from "preact-render-to-string";
import App from "../app/components/App";

// Get the manifest which contains the names of the generated files. The files contain hashes
// that change every time they are updated, which enables aggressive caching.
const manifest = JSON.parse(
  readFileSync(`./dist/public/manifest.json`, "utf8")
);

const css = readFileSync("./dist/main.css", "utf8").replace("\n", "");

const renderPage = (request, reply) => {
  const url = request.headers[":path"];
  const appString = renderToString(<App url={url} />);
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        <meta name="description" content="An open source kanban application created with React and Redux. ">
        <title>Normal title</title>
        <style>${css}</style>
      </head>
      <body>
        <div id="app">${appString}</div>
      </body>
      <script src=${manifest["main.js"]}.gz></script>
    </html>
  `;

  const jsBundle = manifest["main.js"].split("/")[2];

  request.raw.stream.pushStream(
    { ":path": `${manifest["main.js"]}.gz` },
    (err, stream) => {
      if (err) throw err;
      stream.respondWithFile(path.join(__dirname, `./public/${jsBundle}.gz`), {
        "cache-control": "public, max-age=31536000",
        "content-encoding": "gzip",
        "content-type": "application/javascript"
      });
    }
  );

  reply.type("text/html");
  reply.send(html);
};

export default renderPage;
