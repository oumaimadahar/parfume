const express = require("express");
const router = express.Router();
const { toggleLike, getUserLikes } = require("../controllers/likeController.js");
const { protectedRoute } = require("../middlewares/verifyAdmin.js");

// ✅ Ajouter/retirer un like (toggle)
router.post("/:productId", protectedRoute, toggleLike);

// ✅ Obtenir les likes d'un utilisateur
router.get("/", protectedRoute, getUserLikes);

module.exports = router;
