import http from "node:http";
import { pathToFileURL } from "node:url";
import { createTaskStore } from "./store.js";

const store = createTaskStore();

function sendJson(response, status, body) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

export const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host ?? "localhost"}`);

  if (request.method === "GET" && url.pathname === "/health") {
    return sendJson(response, 200, { status: "ok" });
  }

  // TODO: Implement /tasks routes described in README.md.
  // Suggested helpers: readJsonBody, validate filters, matchTaskId, sendError.
  void store;
  return sendJson(response, 404, {
    error: { code: "NOT_FOUND", message: "Route not found" },
  });
});

const isEntryPoint = process.argv[1]
  && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isEntryPoint) {
  const port = Number(process.env.PORT ?? 3000);
  server.listen(port, () => console.log(`Task API listening on http://localhost:${port}`));
}

