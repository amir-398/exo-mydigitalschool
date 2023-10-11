const express = require("express");
const router = express.Router();
const musicController = require("../controllers/musiqueControllers.js");
router
  .route("/")
  .get(musicController.listAllMusics)
  .post(musicController.createAMusic);
router
  .route("/:id_musique")
  .get(postController.getApost)
  .put(postController.updateAPost)
  .delete(postController.deleteAPost);

module.exports = router;
