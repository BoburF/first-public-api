import HttpEasy from "./lib/http-easy";
import * as http from "http";


const server = new HttpEasy(http.createServer())

server.get("/", function (req, res) {
    res.send({hello: "world!"})
})

server.listen(3000, () => {
    console.log("Server listening " + 3000)
})