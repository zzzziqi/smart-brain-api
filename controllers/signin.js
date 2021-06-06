// bcrypt.compare(
//   "bacon",
//   "$2a$10$HmcrvzSsX/ZvSAD5RDVOyelYzysg32j73p4oGB6YFr3C95ugXVvqi",
//   function (err, res) {
//     // res == true
//     console.log("first", res);
//   }
// );
// bcrypt.compare(
//   "veggies",
//   "$2a$10$HmcrvzSsX/ZvSAD5RDVOyelYzysg32j73p4oGB6YFr3C95ugXVvqi",
//   function (err, res) {
//     // res = false
//     console.log("second", res);s
//   }
// );

// if (
//   req.body.email === database.users[1].email &&
//   req.body.password === database.users[1].password
// ) {
//   // res.json("success"); // express buildin Json method
//   res.json(database.users[1]);
// } else {
//   res.status(400).json("error logging in");
// }

// const handleSignin = (req, res, db, bcrypt) =>
const handleSignin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => {
            res.status(400).json("unable to get user");
          });
      } else {
        res.status(400).json("wrong credentials");
      }
    })
    .catch((err) => {
      res.status(400).json("wrong credentials");
    });
};

module.exports = {
  handleSignin: handleSignin,
};
