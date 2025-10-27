const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cartController.js");
const { protectedRoute } = require("../middlewares/verifyAdmin.js");

// ✅ Récupérer le panier
router.get("/", protectedRoute, getCart);

// ✅ Ajouter un produit au panier
router.post("/add", protectedRoute, addToCart);

// ✅ Mettre à jour un article
router.put("/update", protectedRoute, updateCartItem);

// ✅ Supprimer un article
router.delete("/remove/:productId", protectedRoute, removeCartItem);

// ✅ Vider le panier
router.delete("/clear", protectedRoute, clearCart);

module.exports = router;
