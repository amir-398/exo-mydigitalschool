const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validateVote = (vote) => {
  return Number.isInteger(vote) && vote >= 1 && vote <= 5;
};
let voteSchema = new Schema({
  vote: {
    type: Number,
    required: true,
    validate: [validateVote, "Le vote doit être compris entre 1 et 5"],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  musique_id: {
    type: String,
  },
});
module.exports = mongoose.model("Vote", voteSchema);
