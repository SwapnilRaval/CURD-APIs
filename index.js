const express = require("express");
const cors = require("cors");
const db = require("./models");
const bodyParser = require("body-parser");
const env = require('dotenv');
const auth = require("./middleware/auth");
env.config();
const app = express();
const http = require('http');
var httpServer = http.createServer(
  function (request, response) {

    // Setting up Headers
    response.setHeader('Content-Type', 'text/html');
    response.setHeader('Set-Cookie', ['type=ninja',
      'language=javascript'
    ]);


    response.getHeader('Content-Type');
    response.getHeader('Set-Cookie');

    // Getting the set Headers
    const headers = response.getHeaders();

    // Printing those headers
    console.log(headers);

    // Prints Output on the browser in response
    response.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    response.end('ok');
  });

// Listening to http Server
httpServer.listen(process.env.API_PORT, () => {
  console.log(`Running on ${process.env.API_PORT}`);
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

require("./routes")(app);
const PORT = 5000;
app.listen(PORT, () => console.log(`Running on ${PORT}`));
