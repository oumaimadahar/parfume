const express = require("express");
const router = express.Router();
const {
  createOrder,
  markOrderAsPaid,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  getOrderById,
} = require("../controllers/orderController.js");
const { protectedRoute, verifyAdmin } = require("../middlewares/verifyAdmin.js");

// ✅ Utilisateur crée une commande
router.post("/", protectedRoute, createOrder);

// ✅ Marquer la commande comme payée (après paiement)
router.put("/:orderId/pay", protectedRoute, markOrderAsPaid);

// ✅ L'utilisateur voit ses commandes
router.get("/my-orders", protectedRoute, getUserOrders);

// ✅ Admin : voir toutes les commandes
router.get("/", protectedRoute, verifyAdmin, getAllOrders);

// ✅ Admin : changer le statut
router.put("/:orderId/status", protectedRoute, verifyAdmin, updateOrderStatus);

// ✅ Admin : supprimer une commande
router.delete("/:orderId", protectedRoute, verifyAdmin, deleteOrder);
router.get("/:orderId", protectedRoute, getOrderById);

module.exports = router;


