import HttpEasy from "./lib/http-easy";
import * as http from "http";


const server = new HttpEasy(http.createServer())

server.get("/", (req, res) => {
    res.send(`get request to ${req.url} and ${JSON.stringify(req.body)}`)
})

server.post("/token", (req, res) => {
    const body = req.body
    res.send(JSON.stringify(body.secret))
})

server.listen(3000, () => {
    console.log("Server listening " + 3000)
})