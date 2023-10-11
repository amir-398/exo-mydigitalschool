const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let voteSchema = new Schema({
  vote: {
    type: Number,
    required: true,
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
