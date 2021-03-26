const express = require("express");
const app = express();
var fs = require("fs");

const PORT = 8000;
const HOST = "0.0.0.0";

__dirname = "resources";

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/list", function (req, res) {
  fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
    console.log(data);
    res.end(data);
  });
});

app.get("/:id", function (req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
    var users = JSON.parse(data);

    var filteredObject = Object.keys(users).reduce(function (r, e) {
      if (users[e].id.toString() === req.params.id.toString()) {
        r = users[e];
      }
      return r;
    }, {});

    res.end(JSON.stringify(filteredObject));
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
