const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const signin = require("./controllers/signin");
const register = require("./controllers/register");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1", // 127.0.0.1等于local host
    user: "zzzzeng",
    password: "",
    database: "smart-brain",
  },
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

// const database = {
//   users: [
//     {
//       id: "123",
//       name: "zzq",
//       email: "zzq@outlook.com",
//       password: "cookies",
//       entries: 0,
//       joined: new Date(),
//     },
//     {
//       id: "124",
//       name: "ziqi",
//       email: "ziqi@outlook.com",
//       password: "bananas",
//       entries: 0,
//       joined: new Date(),
//     },
//   ],
//   // database
//   login: [
//     {
//       id: "987",
//       has: "",
//       email: "zzq@outlook.com",
//     },
//   ],
// };

app.get("/", (req, res) => {
  //   res.send("this is working");
  res.send(database.users);
});

// app.post("/signin", (req, res) => {
//   signin.handleSignin(req, res, db, bcrypt);
// });
app.post("/signin", signin.handleSignin(db, bcrypt));

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

app.post("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
/* 
planning our api
/ --> res = this is working 
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/
