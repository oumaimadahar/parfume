const Stripe = require("stripe");
const Order = require("../models/Order.js");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Créer une session de paiement Stripe (Utilisateur)
const createCheckoutSession = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate("items.product");

    if (!order) return res.status(404).json({ message: "Order not found" });

    const validItems = order.items.filter(i => i.product !== null);
    if (!validItems.length)
      return res.status(400).json({ message: "No valid products in this order." });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: validItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.product.name },
          unit_amount: item.product.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/payment-success?orderId=${order._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ message: "Payment session error", error });
  }
};

// ✅ Confirmer le paiement
const confirmPayment = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.isPaid = true;
    order.paidAt = new Date();
    await order.save();

    res.json({ message: "Payment confirmed", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Admin : récupérer toutes les transactions
const getAllPayments = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "firstName lastName email") // info utilisateur
      .populate("items.product", "name price");

    const payments = orders.map(o => ({
      orderId: o._id,
      user: o.user ? `${o.user.firstName} ${o.user.lastName}` : "Unknown",
      email: o.user?.email || "-",
      amount: o.items.reduce((sum, i) => sum + (i.product?.price || 0) * i.quantity, 0),
      isPaid: o.isPaid,
      paidAt: o.paidAt,
      createdAt: o.createdAt
    }));

    res.json({ payments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching payments", error });
  }
};

module.exports = {
  createCheckoutSession,
  confirmPayment,
  getAllPayments
};
