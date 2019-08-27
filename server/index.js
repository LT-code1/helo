//Open index.js and require your packages and the controller file.
const path = require("path"); // Usually moved to the start of file
const express = require("express");
const session = require("express-session");
const massive = require("massive");
require("dotenv").config(); //get access to environmental variables
const { SESSION_SECRET, SERVER_PORT, CONNECTION_STRING } = process.env;
const {
  loginControl,
  register,
  updatePassword,
  getOrdersFromUser
} = require("./loginController");

const controller = require("./loginController");
console.log(controller);

const app = express();
app.use(express.static(`${__dirname}/../build`));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET
  })
);

massive(CONNECTION_STRING)
  .then(dbinstance => {
    app.set("db", dbinstance);
    console.log("database connected :)");
  })
  .catch(e => console.log(e));

app.use(express.json()); //gives us access to req.body

// Authentication
app.post("/api/login", loginControl);
app.post("/api/login/register", register);
app.put("/api/login/update", updatePassword);
app.get("/api/getinfo", getOrdersFromUser); /////////////

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(SERVER_PORT, () => console.log("listening on port " + SERVER_PORT)); //runs server
