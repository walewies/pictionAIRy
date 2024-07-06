const express = require("express");
const app = express();
const PORT = 8080;
const IPADDRESS = "192.168.101.109";

app.use(express.static(__dirname + "/html"));

app.get("/", (req, res) => {
    res.sendFile("index.js");
})

app.listen(PORT, () => {
    console.log(`Listening @ http://${IPADDRESS}:${PORT}`);
})