const express = require("express");
const router = express.Router();
const voteController = require("../controllers/voteControllers");
// comment controller
router
  .route("/musique/votes/:id_musique")
  .get(voteController.listAllVotes)
  .post(voteController.createAVote);

router
  .route("/musique/votes/:id_musique/votes")
  .get(voteController.getAVote)
  .put(voteController.updateAVote)
  .delete(voteController.deleteAVote);
module.exports = router;
