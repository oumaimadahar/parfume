const Order = require("../models/Order.js");
const Cart = require("../models/Cart.js");

// ✅ Créer une commande à partir du panier
const createOrder = async (req, res) => {
  try {
    const userId = req.user._id; // token doit être valide
    const { address, paymentMethod, items } = req.body;

    if (!items || !items.length)
      return res.status(400).json({ message: "Votre panier est vide" });

    const orderItems = items.map((i) => ({
      product: i.productId,
      quantity: i.quantity,
    }));

    const totalPrice = 0; // calcul simple ou via produits réels

    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalPrice,
      address,
      paymentMethod,
      isPaid: paymentMethod === "cash" ? false : true,
      paidAt: paymentMethod === "card" ? new Date() : null,
      status: "pending",
    });

    res.status(201).json({ message: "Order created", order });
  } catch (error) {
    console.error("❌ createOrder error:", error);
    res.status(500).json({ message: error.message, error });
  }
};
// ✅ Récupérer une commande spécifique
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user._id;

    const order = await Order.findById(orderId).populate("items.product"); // <-- c'est crucial
    if (!order) return res.status(404).json({ message: "Commande introuvable" });

    // Vérification utilisateur/admin
    if (order.user.toString() !== userId.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    res.json({ order });
  } catch (error) {
    console.error("Erreur getOrderById:", error);
    res.status(500).json({ message: error.message });
  }
};


// ✅ Marquer une commande comme payée (utile après paiement en ligne)
const markOrderAsPaid = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id || "manual",
      status: "succeeded",
      update_time: new Date().toISOString(),
      email_address: req.user.email,
    };

    await order.save();

    res.json({ message: "Order marked as paid", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Récupérer les commandes d’un utilisateur
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId }).populate("items.product");
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Récupérer toutes les commandes (admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "email")
      .populate("items.product");
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Mettre à jour le statut (admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Supprimer une commande (admin)
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const deleted = await Order.findByIdAndDelete(orderId);
    if (!deleted) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  markOrderAsPaid,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  getOrderById, 
};




