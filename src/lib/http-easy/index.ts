import {IncomingMessage, Server, ServerResponse} from "http";

export interface IHttpEasy {
    listen: (port: number, cb: () => void) => void
    get: (url: string, cb: (req: Request, res: Response) => void) => void
    post: (url: string, cb: (req: Request, res: Response) => void) => void
    update: (url: string, cb: (req: Request, res: Response) => void) => void
    delete: (url: string, cb: (req: Request, res: Response) => void) => void
}

export interface Request extends IncomingMessage {
    body: { [key: string]: any }
}

export interface Response extends ServerResponse {
    send: (msg: any) => void
    status: (statusNumber: number) => void
}

export default class HttpEasy implements IHttpEasy {
    private callbacks = {
        get: {},
        post: {},
        update: {},
        delete: {}
    }

    constructor(private httpServer: Server) {}

    public get(url: string, cb: (req: Request, res: Response) => void) {
        this.callbacks.get[url] = cb
    }

    public post(url: string, cb: (req: Request, res: Response) => void) {
        this.callbacks.post[url] = cb
    }

    public update(url: string, cb: (req: Request, res: Response) => void) {
        this.callbacks.update[url] = cb
    }

    public delete(url: string, cb: (req: Request, res: Response) => void) {
        this.callbacks.delete[url] = cb
    }

    public listen(port: number, cb?: () => void) {
        this.httpServer.on("request", async (req: Request, res: Response) => {
            await this.setUpRequestAndResponse(req, res)
            const callback = this.callbacks[req.method.toLowerCase()][req.url]
            if (callback) {
                return callback(req, res)
            }
            return res.send(`404:Not found resource ${req.url}`)
        })

        this.httpServer.listen(port, cb)
    }

    private async setUpRequestAndResponse(req: IncomingMessage, res: ServerResponse): Promise<void> {
        await this.parseBody(req)
        this.setResponseSendAndStatusFunc(res)
    }

    private parseBody(req: IncomingMessage): Promise<void> {
        let body = '';

        return new Promise((resolve, _) => {
            req.on('data', (chunk) => {
                body += chunk;
            });

            req.on('end', () => {
                req["body"] = JSON.parse(body || "{}");
                resolve()
            });
        })
    }

    private setResponseSendAndStatusFunc(res: ServerResponse) {
        res["status"] = (statusNumber: number) => {
            res.statusCode = statusNumber
        }
        res['send'] = function (msg: any) {
            res.write(JSON.stringify(msg))
            return res.end()
        }
    }
}