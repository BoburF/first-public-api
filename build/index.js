"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_easy_1 = require("./lib/http-easy");
const http = require("http");
const server = new http_easy_1.default(http.createServer());
server.get("/", function (req, res) {
    res.send({ hello: "world!" });
});
server.listen(3000, () => {
    console.log("Server listening " + 3000);
});
//# sourceMappingURL=index.js.map