const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const router = require("./src/router");

// Create Express webapp
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use(router);

// Create http server and run it
const server = http.createServer();
const port = process.env.PORT || 3000;

let WSServer = require("ws").Server;
let wss = new WSServer({
    server: server,
});

server.on("request", app);

wss.on("connection", function connection(ws) {
    ws.on("message", function incoming(message) {
        // console.log(`received: ${message}`);
        const msg = JSON.parse(message);
        switch (msg.event) {
            case "connected":
                console.log("connected");
            case "start":
                // console.log("connected");
                break;
            case "media":
                console.log("received call packet");
                break;
            case "stop":
                // console.log("connected");
                break;
        }
    });
});

server.listen(port, function () {
    console.log("server running on *:" + port);
});
