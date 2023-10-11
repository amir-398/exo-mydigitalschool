const Music = require("../models/musiqueModel");

exports.listAllMusics = async (req, res) => {
  try {
    const musics = await Music.find({});
    res.status(200).json(musics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

exports.createAMusic = async (req, res) => {
  try {
    const newMusique = new Music(req.body);
    const music = await newMusique.save();
    res.status(201).json(music);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.updateAMusic = async (req, res) => {
  try {
    const musicId = req.params.id_music;
    const music = await Music.findByIdAndUpdate(musicId, req.body, {
      new: true,
    });
    if (!music) {
      return res.status(404).json({ error: "Musique non trouvée" });
    }
    res.status(200).json(music);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.deleteAMusic = async (req, res) => {
  const musicId = req.params.id_music;
  try {
    const music = await Music.findByIdAndDelete(musicId);
    if (!music) {
      return res.status(404).json({ error: "Musique non trouvée" });
    }
    res.status(204).end(); // 204 signifie "No Content" pour une suppression réussie
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.getAMusic = async (req, res) => {
  try {
    const musicId = req.params.id_music;
    const music = await Music.findById(musicId);
    if (!music) {
      return res.status(404).json({ error: "Musique non trouvée" });
    }
    res.status(200).json(music);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
