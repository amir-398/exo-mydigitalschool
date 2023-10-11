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
exports.listAllVotes = async (req, res) => {
  try {
    const currentDate = new Date().toISOString().split("T")[0];
    const startOfDay = new Date(currentDate + "T00:00:00.000Z");
    const endOfDay = new Date(currentDate + "T23:59:59.999Z");

    const votes = await Vote.find({
      musique_id: req.params.id_musique,
      created_at: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

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
      return res.status(400).json({
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

const mongodb = require("mongodb");

exports.calculateTotalVotes = async (req, res) => {
  try {
    const musicId = req.params.id_musique;
    const music = await Music.findById(musicId);
    if (!music) {
      return res.status(404).json({ error: "Musique non trouvée" });
    }

    // Calculer le total des votes pour la musique spécifiée
    const totalVotes = await Vote.aggregate([
      {
        $match: { musique_id: req.params.id_musique },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$vote" },
        },
      },
    ]);
    if (totalVotes.length > 0) {
      res.status(200).json({ totalVotes: totalVotes[0].total });
    } else {
      res.status(404).json({ error: "Aucun vote trouvé pour cette musique" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
