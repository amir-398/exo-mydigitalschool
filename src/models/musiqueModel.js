const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Créez une fonction de validation d'e-mail
function validateMail(email) {
  // Utilisez une expression régulière pour valider l'e-mail
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}
let musiqueSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: "Le contenu est requis",
  },
  mail: {
    type: String,
    required: "Le contenu est requis",
    validate: {
      validator: validateMail,
      message: "Adresse e-mail invalide",
    },
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Musique", musiqueSchema);
