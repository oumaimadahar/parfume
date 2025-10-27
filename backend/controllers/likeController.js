const Like = require("../models/Like.js");
const Product = require("../models/Product.js");

// ✅ Ajouter ou retirer un like (toggle)
const toggleLike = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const existingLike = await Like.findOne({ user: userId, product: productId });

    if (existingLike) {
      await existingLike.deleteOne();
      return res.json({ message: "Product unliked" });
    } else {
      const like = await Like.create({ user: userId, product: productId });
      return res.status(201).json({ message: "Product liked", like });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Obtenir tous les produits likés par un utilisateur
const getUserLikes = async (req, res) => {
  try {
    const userId = req.user._id;
    const likes = await Like.find({ user: userId }).populate("product");
    res.json({ likes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { toggleLike, getUserLikes };
