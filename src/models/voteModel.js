const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let voteSchema = new Schema({
  vote: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  music_id: {
    type: String,
  },
});
module.exports = mongoose.model("Vote", voteSchema);
