const handleProfile = (req, res, db) => {
  const { id } = req.params;
  // let found = false;
  // database.users.forEach((user) => {
  //   if (user.id === id) {
  //     // found = true;
  //     return res.json(user);
  //   }
  // });
  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("not found");
      }
      // console.log(user[0]);
    })
    .catch((err) => {
      return res.status(400).json("error getting user");
    });
  // res.status(404).json("no such user");
};

module.exports = {
  handleProfile,
};
