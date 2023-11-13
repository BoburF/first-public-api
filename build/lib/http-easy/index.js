"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpEasy {
    constructor(httpServer) {
        this.httpServer = httpServer;
        this.callbacks = {
            get: {},
            post: {},
        };
    }
    get(url, cb) {
        this.callbacks.get[url] = cb;
    }
    post(url, cb) {
        this.callbacks.post[url] = cb;
    }
    listen(port, cb) {
        this.httpServer.on("request", async (req, res) => {
            await this.setUpRequestAndResponse(req, res);
            const callback = this.callbacks[req.method.toLowerCase()][req.url];
            if (callback) {
                callback(req, res);
            }
            else {
                res.send(`404:Not found resource ${req.url}`);
            }
        });
        this.httpServer.listen(port, cb);
    }
    async setUpRequestAndResponse(req, res) {
        await this.parseBody(req);
        this.setResponseSendAndStatusFunc(res);
    }
    parseBody(req) {
        let body = '';
        return new Promise((resolve, _) => {
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                req["body"] = JSON.parse(body || "{}");
                resolve();
            });
        });
    }
    setResponseSendAndStatusFunc(res) {
        res["status"] = (statusNumber) => {
            res.statusCode = statusNumber;
        };
        res['send'] = function (msg) {
            res.write(msg);
            res.end();
        };
    }
}
exports.default = HttpEasy;
//# sourceMappingURL=index.js.map