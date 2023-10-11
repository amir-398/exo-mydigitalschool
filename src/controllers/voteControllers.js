const Vote = require("../models/voteModel");
const Music = require("../models/musiqueModel");

// Liste tous les votes pour une musique spécifique
exports.listAllVotes = async (req, res) => {
  try {
    const votes = await Vote.find({ musique_id: req.params.id_musique });
    res.status(200).json(votes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

// Crée un vote pour une musique spécifique
exports.createAVote = async (req, res) => {
  try {
    const music = await Music.findById(req.params.id_musique);
    console.log(req.params.id_musique);
    if (!music) {
      return res.status(404).json({ error: "Musique non trouvée" });
    }
    const voteValue = parseFloat(req.body.vote);

    if (
      isNaN(voteValue) ||
      voteValue < 1 ||
      voteValue > 5 ||
      !Number.isInteger(voteValue)
    ) {
      return res
        .status(400)
        .json({
          error:
            "Le vote doit être un entier entre 1 et 5 et doit être un entier",
        });
    }
    const newVote = new Vote({
      ...req.body,
      musique_id: req.params.id_musique,
    });
    try {
      const vote = await newVote.save();
      res.status(201).json(vote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur (db)" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur (post inexistant)" });
  }
};

// Obtenir un vote par son ID
exports.getAVote = async (req, res) => {
  try {
    const vote = await Vote.findById(req.params.id_vote);
    if (!vote) {
      return res.status(404).json({ error: "Vote non trouvé" });
    }
    res.status(200).json(vote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Mettre à jour un vote
exports.updateAVote = async (req, res) => {
  try {
    const vote = await Vote.findByIdAndUpdate(req.params.id_vote, req.body, {
      new: true,
    });
    if (!vote) {
      return res.status(404).json({ error: "Vote non trouvé" });
    }
    res.status(200).json(vote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Supprimer un vote
exports.deleteAVote = async (req, res) => {
  const id = req.params.id_vote;
  try {
    const vote = await Vote.findByIdAndDelete(id);
    if (!vote) {
      return res.status(404).json({ error: "Vote non trouvé" });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
