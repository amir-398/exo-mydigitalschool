// importer express
const express = require("express");
// initialiser variable type app qui contient les methodes de express
const app = express();
// le port
const port = 3000;
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/apinode");
app.use(express.urlencoded());
app.use(express.json());
// res = resultat , req = request
const musicRoute = require("./routes/musiqueRoute");
const voteRoute = require("./routes/voteRoute");
app.use("/musique", musicRoute);
app.use("/", voteRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
