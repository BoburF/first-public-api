"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_easy_1 = require("./lib/http-easy");
const http = require("http");
const server = new http_easy_1.default(http.createServer());
server.get("/", (req, res) => {
    res.send(`get request to ${req.url} and ${JSON.stringify(req.body)}`);
});
server.post("/token", (req, res) => {
    const body = req.body;
    res.send(JSON.stringify(body.secret));
});
server.listen(3000, () => {
    console.log("Server listening " + 3000);
});
//# sourceMappingURL=index.js.map