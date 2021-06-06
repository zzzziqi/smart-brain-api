const { json } = require("body-parser");
const Clarifai = require("clarifai");

const app = new Clarifai.App({ apiKey: "b245f7327c72491f83ffec3cdbfffb85" });

const handleApiCall = (req, res) => {
  app.models
    .initModel({
      id: Clarifai.FACE_DETECT_MODEL,
      // version: "53e1df302c079b3db8a0a36033ed2d15",
    })
    .then((generalModel) => {
      // return generalModel.predict(this.state.urlInput);
      return generalModel
        .predict(req.body.input)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => res.status(400).json("unable to work with API"));
    });
};
const handleImage = (req, res, db) => {
  const { id } = req.body;
  // let found = false;
  // database.users.forEach((user) => {
  //   if (user.id === id) {
  //     // found = true;
  //     user.entries++;
  //     return res.json(user.entries);
  //   }
  // });
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => {
      res.status(404).json("unable to get entries");
    });
  // res.status(404).json("unable to get entries");
};

module.exports = {
  handleImage,
  handleApiCall,
};
