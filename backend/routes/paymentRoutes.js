const express = require("express");
const router = express.Router();
const { protectedRoute, verifyAdmin } = require("../middlewares/verifyAdmin.js");
const { createCheckoutSession, confirmPayment, getAllPayments } = require("../controllers/paymentController.js");

// Utilisateur : créer une session Stripe
router.post("/:orderId/create-session", protectedRoute, createCheckoutSession);

// Utilisateur : confirmer le paiement
router.put("/:orderId/confirm", protectedRoute, confirmPayment);

// Admin : récupérer toutes les transactions
router.get("/", protectedRoute, verifyAdmin, getAllPayments);

module.exports = router;
