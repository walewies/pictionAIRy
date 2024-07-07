const express = require("express");
const app = express();
const PORT = 8080;
const IPADDRESS = "192.168.101.109";
const https = require("https");
const fs = require("fs");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/html"));
app.use(express.static(__dirname + "/javascript"));
app.use(express.static(__dirname + "/css"));

const options = {
    key: fs.readFileSync(__dirname + "/keys/server.key"),
    cert: fs.readFileSync(__dirname + "/keys/server.cert"),
};

app.get("/", (req, res) => {
    res.sendFile("index.js");
})

https.createServer(options, app).listen(PORT, () => {
    console.log(`Listening @ https://${IPADDRESS}:${PORT}`);
})