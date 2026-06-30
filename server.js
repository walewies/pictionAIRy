const express = require("express");
const app = express();
const path = require("path");
const https = require("https");
const fs = require("fs");
const { Server } = require("socket.io");

const PORT = 8080;
const IPADDRESS = "192.168.101.118";

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve ONLY static assets
app.use("/js", express.static(path.join(__dirname, "javascript")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/images", express.static(path.join(__dirname, "images"))); // if you have one

const options = {
    key: fs.readFileSync(path.join(__dirname, "keys", "server.key")),
    cert: fs.readFileSync(path.join(__dirname, "keys", "server.cert")),
};

// HTML routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "index.html"));
});

app.get("/join-room", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "join-room.html"));
});

app.get("/create-room", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "create-room.html"));
});

// Create HTTPS server
const server = https.createServer(options, app);

// Initialize Socket.IO
const io = new Server(server);

io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`Listening @ https://${IPADDRESS}:${PORT}`);
});