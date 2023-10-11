const Music = require("../models/musiqueModel");
exports.listAllMusics = async (req, res) => {
  try {
    const posts = await Music.find({});
    res.status(200);
    res.json(posts);
  } catch (err) {
    res.status(500);
    console.log(err);
    res.json({ message: "Erreur serveur." });
  }
};
exports.createAMusic = async (req, res) => {
  const newMusique = new Music(req.body);
  try {
    const music = await newMusique.save();
    res.status(201);
    res.json(music);
  } catch (error) {
    res.status(500);
    console.log(error);
    res.json({ message: "Erreur serveur" });
  }
};

exports.updateAMusic = async (req, res) => {
  try {
    const musicId = req.params.id_music;
    const music = await Music.findOneAndUpdate({ _id: musicId }, req.body);
    res.status(201);
    res.json(music);
  } catch (error) {
    res.status(500);
    console.log(error);
    res.json({ message: "Erreur serveur" });
  }
};
// Delete a post
exports.deleteAMusic = async (req, res) => {
  const id = req.params.id_post;
  try {
    const music = await Music.findByIdAndDelete(id, req.body, { new: true });
    res.status(201);
    res.json(music);
  } catch (error) {
    res.status(500);
    console.log(error);
    res.json({ message: "Erreur serveur" });
  }
};

// // get a post by id
// exports.getAMusic = async (req, res) => {
//   try {
//     const musicId = req.params.id_music;
//     const post = await Music.findById(musicId);
//     res.status(201);
//     res.json(post);
//   } catch (error) {
//     console.error(error);
//     res.status(500);
//     res.json({ message: "Erreur serveur" });
//   }
// };
